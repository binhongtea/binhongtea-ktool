// 获取元素
const result = document.getElementById('result');
const historyList = document.getElementById('historyList');
// 存储历史记录
let history = [];
// 添加数字或小数点
function addNumber(value) {
	// 如果当前结果为0或者已经计算过了，则清空结果
	if (result.value === '0' || result.value === '计算结果') {
		result.value = '';
	}
	result.value += value;
}
// 添加运算符
function addOperator(value) {
	// 如果当前结果为0或者已经计算过了，则不能添加运算符
	if (result.value === '0' || result.value === '计算结果') {
		return;
	}
	result.value += value;
}
// 添加小数点
function addDecimal() {
	// 如果当前结果中已经有小数点了，则不能再添加
	if (result.value.indexOf('.') !== -1) {
		return;
	}
	result.value += '.';
}
// 清空结果
function clearResult() {
	result.value = '0';
}
// 删除最后一个字符
function backspace() {
	result.value = result.value.slice(0, -1);
	// 如果结果为空，则显示0
	if (result.value === '') {
		result.value = '0';
	}
}
// 计算结果
function calculate() {
	// 如果当前结果为0或者已经计算过了，则不能再进行计算
	if (result.value === '0' || result.value === '计算结果') {
		return;
	}
	let expression = result.value; // 获取表达式
	let resultValue = eval(expression); // 计算结果
	result.value = resultValue; // 显示结果
	history.push(expression + ' = ' + resultValue); // 添加历史记录
	updateHistoryList(); // 更新历史记录列表
}
// 更新历史记录列表
function updateHistoryList() {
	historyList.innerHTML = '';
	history.forEach((item, index) => {
		let li = document.createElement('li');
		li.innerText = item;
		li.setAttribute('data-index', index);
		// 添加删除按钮
		let delButton = document.createElement('button');
		delButton.innerText = '删除';
		delButton.onclick = deleteHistoryItem;
		li.appendChild(delButton);
		historyList.appendChild(li);
	});
}