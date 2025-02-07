// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract Token {
    address private _owner;
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _totalSupply;

    mapping(address => uint256) private _balanceOf;
    mapping(address => mapping(address => uint256)) private _allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor(
        string memory _initialName,
        string memory _initialSymbol,
        uint8 _initialDecimals,
        uint256 _initialSupply
    ) {
        _owner = msg.sender;
        _name = _initialName;
        _symbol = _initialSymbol;
        _decimals = _initialDecimals;
        _totalSupply = _initialSupply * (10**_decimals);
        _balanceOf[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only owner can call this function");
        _;
    }

    modifier hasBalance(address _account, uint256 _value) {
        require(_balanceOf[_account] >= _value, "Not enough tokens");
        _;
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function decimals() external view returns (uint8) {
        return _decimals;
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _account) external view returns (uint256) {
        return _balanceOf[_account];
    }

    function allowance(address _account, address _spender)
        external
        view
        returns (uint256)
    {
        return _allowance[_account][_spender];
    }

    function transfer(address _to, uint256 _value)
        external
        hasBalance(msg.sender, _value)
        returns (bool)
    {
        require(_to != address(0), "Invalid address");

        _balanceOf[msg.sender] -= _value;
        _balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external hasBalance(_from, _value) returns (bool) {
        require(_to != address(0), "Invalid address");
        require(_allowance[_from][msg.sender] >= _value, "Allowance too low");

        _balanceOf[_from] -= _value;
        _balanceOf[_to] += _value;
        _allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) external returns (bool) {
        _allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function mint(address _to, uint256 _value) external onlyOwner {
        require(_to != address(0), "Invalid address");

        _totalSupply += _value;
        _balanceOf[_to] += _value;

        emit Transfer(address(0), _to, _value);
    }

    function burn(uint256 _value) external hasBalance(msg.sender, _value) {
        _totalSupply -= _value;
        _balanceOf[msg.sender] -= _value;

        emit Transfer(msg.sender, address(0), _value);
    }
}
