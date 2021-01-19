function refresh(){
	$("body").empty();
	// 绑定主页面binding body
	$(`	<body>
		<header>学生管理系统</header>
		<aside>
			<ul>
				<li>查看学生信息</li>
				<li>添加学生信息</li>
				<li>统计数据图表</li>
				<li>条件查询</li>
			</ul>
		</aside>
		<script language="javascript">
			var user = namestorage.getItem("name");
			console.log(user)
			$("#ray").text("Hi"+ " " +user);
		  </script> 
		<main>
			<span id="ray" style="color:darkslategrey;font-size: 6em;margin: 150px 50px;">Hi name</span>
		</main>	
		
	</body>`).appendTo($("body"))
	init()
}

function renderList() {
	$(`	<table class="list">
			<tr>
				<th>姓名</th>
				<th>性别</th>
				<th>出生日期</th>
				<th>电话号码</th>
				<th>学号</th>
				<th>入学时间</th>
				<th>操作</th>
			</tr>
		</table>`).appendTo($("main"))
	// 遍历数组,只要数组中有元素,就创建一个tr元素,在tr中创建三个td元素分别存储一个学生的三个属性
	// 完成后将生成的tr元素追加到table中
	for(let i = 0; i < arr.length; i++) {
		//数组中的每一个对象创建一个<tr>对象
		var trEle = $('<tr>')
		//遍历当前对象的属性，
		var currentId;
		for(var attr in arr[i]) {
			if(attr === "studentId") {
				currentId = arr[i][attr]
			}
			//为对象的每一个属性创建一个<td>对象并赋值
			var tdEle = $('<td>').text(arr[i][attr])
			// 将td节点追加到tr上
			trEle.append(tdEle)
		}
		//为每一行添加额外单元格用来显示删除操作/更新操作按钮
		var opCell = $('<td><button class="delete">删除</button> <button class="update">更新</button></td>')
		//为新创建的按钮添加一个studentId属性，值为当前行学生的studentId
		opCell.find('button').attr("studentId", currentId)
		//为删除按钮添加点击事件
		opCell.find('.delete').click(function() {
			//当按钮被点击时，首先获取按钮的studentId的属性的值
			var studentId = $(this).attr("studentId")
			//遍历数组查找学号为删除按钮studentId属性的值的学生
			for(var i = 0; i < arr.length; i++) {
				if(arr[i].studentId === studentId) {
					//找到后删除
					arr.splice(i, 1)
				}
			}
			//删除页面中的表行
			$(this).closest('tr').remove()
		})

		//为更新按钮添加点击事件
		opCell.find('.update').click(function() {
			//做一次查询获取学生信息
			var student = {}
			for(var i = 0; i < arr.length; i++) {
				//如果当前遍历到的学生的学号与要找的学号一直，将当前学生存储起来
				if(arr[i].studentId === $(this).attr("studentId")) {
					student = arr[i]
				}
			}
			//清空主显示区域
			$('main').empty()
			//绘制更新视图
			renderUpdate(student)
		})
		trEle.append(opCell) //将按钮单元格追加到当前行
		$('table').append(trEle); //将当前行追加到table
	}
}

//渲染添加学生视图
function renderAdd() {
	//创建表单节点并追加到<main>节点上
	$(`<form>
		<fieldset id="">
				<legend>添加学生</legend>
				<table>
					<tr>
						<td>学号：</td>
						<td><input type="text" id="id"/></td>
					</tr>
					<tr>
						<td>姓名：</td>
						<td><input type="text" id="name"/></td>
					</tr>
					<tr>
						<td>出生日期：</td>
						<td><input type="text" id="DoB"/></td>
					</tr>
					<tr>
					    <td>性别：</td>
						<td><input type="text" id="gender"/></td>
					</tr>
					<tr>
					    <td>电话号码：</td>
						<td><input type="text" id="phonenumber"/></td>
					</tr>
					<tr>
					    <td>入学时间：</td>
						<td><input type="text" id="YoE"/></td>
					</tr>
					<tr>
						<td><span class="addInfo">添加</span></td>
						<td><span class="clearInfo">清空</span></td>
					</tr>
				</table>
			</fieldset>
		</form>
			`).appendTo($("main"))
	$('form table').css({
		"margin": "auto",
		"border": "none",
		"text-align": "center"
	}).find('td').css('border', 'none')

	//给添加表单的提交按钮添加事件响应
	$(".addInfo").click(function() {
		//用户点击添加时收集表单中控件的数据
		//用户输入的学生号
		var studentId = $("#id").val()
		//输入的学生姓名
		var name = $("#name").val()
		//输入的年龄
		var DoB = $("#DoB").val()
		var phonenumber = $("#phonenumber").val()
		var gender = $("#gender").val()
		var YoE = $("#YoE").val()
		//将收集到的数据组成一个对象{}，添加到数组arr中去
		var map1 = new Map()
		for(let item of arr)
		{
			map1.set(item.studentId, 1)
			}
			if(map1.has(studentId))
			{
				$("<span class='msg'>该学生已被添加</span>").appendTo("main").fadeOut(1500)
			}	
		else
		{
			arr.push({
			name: name,
			gender: gender,
			DoB: DoB,
			phonenumber: phonenumber,
			studentId: studentId,
			YoE: YoE,
			})
		//生成提示信息
		$("<span class='msg'>添加成功</span>").appendTo($("main")).fadeOut(1500)
		
	}
})
}
function renderUpdate(student) {
	//创建表单节点并追加到<main>节点上
	$(`<form>
		<fieldset id="">
				<legend>更新学生信息</legend>
				<table>
					<tr>
						<td>学号：</td>
						<td><input type="text" id="studentId" value=${student.studentId} readonly/></td>
					</tr>
					<tr>
						<td>姓名：</td>
						<td><input type="text" id="name" value=${student.name} /></td>
					</tr>
					<tr>
						<td>性别：</td>
						<td><input type="text" id="gender" value=${student.gender} /></td>
					</tr>
					<tr>
						<td>电话号码：</td>
						<td><input type="text" id="phonenumber" value=${student.phonenumber} /></td>
					</tr>
					<tr>
						<td>出生日期：</td>
						<td><input type="text" id="DoB" value=${student.DoB} /></td>
					</tr>
					<tr>
						<td>入学时间：</td>
						<td><input type="text" id="YoE" value=${student.YoE} /></td>
					</tr>
					<tr>
						<td><span class="updateInfo">更新</span></td>
						<td><span class="clearInfo">清空</span></td>
					</tr>
				</table>
			</fieldset>
		</form>
			`).appendTo($("main"))
	$('form table').css({
		"margin": "auto",
		"border": "none",
		"text-align": "center"
	}).find('td').css('border', 'none')
	//为更新按钮添加事件响应
	$(".updateInfo").click(function() {
		//收集用户在表单中输入的数据
		student = {
			name: $("#name").val(),
			DoB: $("#DoB").val(),
			studentId: $("#studentId").val(),
			phonenumber: $("#phonenumber").val(),
			gender: $("#gender").val(),
			YoE: $("#YoE").val()
		}
		//遍历数组根据学号寻找要更新的学生
		for(let i = 0; i < arr.length; i++) {
			//一旦找到了就将目标学生的属性进行修改
			if(arr[i].studentId === student.studentId) {
				arr[i].name = student.name
				arr[i].gender = student.gender
				arr[i].phonenumber = student.phonenumber
				arr[i].DoB = student.DoB
				arr[i].YoE = student.YoE
				//查到了就可以结束循环了
				break
			}
		}
		//生成提示信息
		$("<span class='msg'>更新成功</span>").appendTo("main").fadeOut(1500)

	})

}

//绘制图表
function renderChart() {
	//创建放置图表的容器
	$("<div id='chart' style='width: 800px;height:600px;'></div>").appendTo($("main"))
	//初始化图表容器
	var myChart = echarts.init(document.getElementById("chart"));

	// 指定图表的配置项和数据
	var option = {
		title: {//图例标题
				text: '入学年份分布'
		},
		tooltip: {},
		legend: {//图例描述
			data: ['人数']
		},
		xAxis: {// x轴的设置
			name:'YOE',
        	type: 'value',
        	interval:1, // 步长
       	 	min:2012, // 起始
        	max:2019 // 终止
        	},
		yAxis: {},
		series: [{  //数据系列
			name: '人数',
			type: 'bar', //柱状图
			interval: 1,
			data: prepareData(JSON.parse(storage.getItem('arr')) ) //加载要显示的数据
		}]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
}
// 为图表准备数据
function prepareData(arr) {
	//map是常用的一种数据结构，其主要用途是高效的查询检索(通过hash来实现)，javascript 中有对map的具体实现
	//通过new Map()创建一个map对象，这一点很像java。 javascript是基于对象的，但是实际上它，至少我们用的这个版本不是面向对象的。
	//map作为一个数据结构，它的存储的点是：以键值对（key,value）的形式存储数据，key是不重复的，value需要通过对应的key来获取
	//比如存学生信息：key 可以是学生学号，value 是学生对象
	//存入map的元素是无序的，也就是说存入的顺序跟元素最终在容器中的位置不一定相同
	var map = new Map()
	//遍历学生数组
	for(let item of arr) {
		//has方法用来检测map中是否已经存在某个key
		var YoEyear = parseInt(item.YoE)//入学年龄
		console.log(YoEyear)
		if(map.has(YoEyear)) {
			//如果map中已经存在了这个年龄值，将改入学年值对应的value加一，表示这个年份的学生又多一个
			map.set(YoEyear, map.get(YoEyear) + 1)
		} else {
			//如果不存在，将该年龄值添加到map中，对应的value设置初始值为1
			map.set(YoEyear, 1)
		}
	}
	//因为map是为无序的，我们要将它转回数组再排序
	//Array.from(map) 将map转为数组
	//sort()方法用来对数组排序
	//sort()参数是一个匿名方法，用来指定排序的规则
	var arr2 = Array.from(map).sort(function(a, b) {
		return a[0] - b[0]
	})
	//将处理好的数据返回
	return arr2

}

//性别查询 （保留男性）
	function cds_male(){
		arr = JSON.parse(storage.getItem('arr')) // 抓取localstorage中的原始arr（强制转换为数组对象）
		for(var i = 0; i < arr.length; i++) {
				if(arr[i].gender === "Female") {
					//找到后删除
					
					
					
					
					arr.splice(i, 1)
					i-- //原地踏步，抵消splice改变的index
				}
			}
				//删除页面中的表行
			$(this).closest('tr').remove()
			//重新绘制
			$("main").empty()
			//渲染学生列表
			renderList()
		}
		//年龄查询（16-18）
	
	function cds_age(){
		arr = JSON.parse(storage.getItem('arr')) // 抓取localstorage中的原始arr（强制转换为数组对象）
		var d = new Date() //获取本地时间
		for(var i = 0; i < arr.length; i++) {
					var age = d.getFullYear() - parseInt(arr[i].DoB.substring(0,4)); //本地年份-出生时间的中的年份（substring截取的）
					console.log(age)
					if(age < 16 || age > 18) {
						//找到后删除
						arr.splice(i, 1)
						i-- //原地踏步，抵消splice改变的index
					}
				}
				//删除页面中的表行
				$(this).closest('tr').remove()
				//重新绘制
				$("main").empty()
				//渲染学生列表
				renderList()
			}
			
	// 手机号开头查询		
	function cds_phone(){
		arr = JSON.parse(storage.getItem('arr')) // 抓取localstorage中的原始arr（强制转换为数组对象）
		for(var i = 0; i < arr.length; i++) {
				// 截取手机号开头，不等于180的删除
				if(!(arr[i].phonenumber.substring(0,3) === "180")) {
					//找到后删除
					arr.splice(i, 1)
					i-- //原地踏步，抵消splice改变的index
				}
			}
			//删除页面中的表行
			$(this).closest('tr').remove()
			//重新绘制
			$("main").empty()
			//渲染学生列表
			renderList()
		}
	// 学长寻找（3年以上）
	function cds_alumni(){
		arr = JSON.parse(storage.getItem('arr')) // 抓取localstorage中的原始arr（强制转换为数组对象）
		var d = new Date() //本地时间
		for(var i = 0; i < arr.length; i++) {
				var years = d.getFullYear() - parseInt(arr[i].YoE); //本地年份-入学时间
					if(years < 3) {
						//找到后删除
						arr.splice(i, 1)
						i-- //原地踏步，抵消splice改变的index
					}
				}
				//删除页面中的表行
				$(this).closest('tr').remove()
				//重新绘制
				$("main").empty()
				//渲染学生列表
				renderList()
			}
		

//条件搜索代码区
function search(){
	//利用替换，把button绑定到上main上
	// button 内含方法
$(`  
  <div class = "search">
	<button type="button" onclick="cds_male()" class="male" margin-left:50px; width:160px;height: 50px;>male</button>
	<button type="button" onclick="cds_age()" class="age" margin-left:150px; width:160px;height: 50px;>age</button>
	<button type="button" onclick="cds_phone()" class="phone" margin-left:200px; width:160px;height: 50px;>phone</button>
	<button type="button" onclick="cds_alumni()" class="alumni" margin-left:250px; width:160px;height: 50px;>alumni</button>
  		</div>
		`).appendTo($("main"))
}



//项目初始化
function init(){
	//给查看学生按钮绑定事件
	//nth-child(order)是一种常用的选择器，用来选中某个父类下的第n个某类型的子元素
	//这个例子中我们选中了li的父类(ul)下的第一个li元素
	$("li:nth-child(1)").click(function() {
		$("main").empty()
		//渲染学生列表
		renderList()
	})
	//给更新学生按钮绑定事件
	$("li:nth-child(2)").click(function() {
		$("main").empty()
		//渲染添加学生表单
		renderAdd()
	})
	//给统计图表按钮绑定事件
	$("li:nth-child(3)").click(function() {
		$("main").empty()
		//绘制图表
		renderChart()
	})
	//对data进行条件查询
	$("li:nth-child(4)").click(function() {
		$("main").empty()
		//条件查找
		search()
	})

}
	

//$(function(){})结构用来实现延迟加载
//首页加载时调用初始化函数
var storage = localStorage //创建本地存储，用于储存原始数据
$(function(){
	init()
	storage.setItem('arr',JSON.stringify(arr))//健值对，存储原始arr数据（利用JSON.stringify强制转换为string）
})

