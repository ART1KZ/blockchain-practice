// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract Token {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _totalSupply;

    mapping(address => uint256) private _balanceOf;
    mapping(address => mapping(address => uint256)) private _allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor(
        string memory _initialName,
        string memory _initialSymbol,
        uint8 _initialDecimals,
        uint256 _initialSupply
    ) {
        _name = _initialName;
        _symbol = _initialSymbol;
        _decimals = _initialDecimals;
        _totalSupply = _initialSupply * (10 ** _decimals);
        _balanceOf[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
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

    function balanceOf(address _owner) external view returns (uint256) {
        return _balanceOf[_owner];
    }

    function allowance(address _owner, address _spender)
        external
        view
        returns (uint256)
    {
        return _allowance[_owner][_spender];
    }

    function transfer(address _to, uint256 _value) external returns (bool) {
        require(_balanceOf[msg.sender] >= _value, "Not enough tokens");
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
    ) external returns (bool) {
        require(_balanceOf[_from] >= _value, "Not enough tokens");
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
}
