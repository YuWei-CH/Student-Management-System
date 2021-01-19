var arr = [{name:'Alice',gender:'Female',DoB:'2001-01-01',phonenumber:'18054317979',studentId:'1000',YoE:'2017'},
			{name:'Tim',gender:'Male',DoB:'2002-05-06',phonenumber:'15670834457',studentId:'1001',YoE:'2018'},
			{name:'Ricky',gender:'Male',DoB:'1997-11-10',phonenumber:'17344312895',studentId:'1002',YoE:'2013'},
			{name:'Zoe',gender:'Female',DoB:'2000-07-12',phonenumber:'18013294873',studentId:'1003',YoE:'2016'},
			{name:'Joan',gender:'Female',DoB:'2002-04-03',phonenumber:'18098762475',studentId:'1004',YoE:'2018'},
			{name:'Robin',gender:'Male',DoB:'1999-02-01',phonenumber:'15433320795',studentId:'1005',YoE:'2015'},
		];			
		//出生日期的格式为年-月-日；
		//general notes: 1. 需要调整‘查看学生信息’窗口大小和位置；
		//已知bug: 1. 统计数据图表中Y轴区间不符合常理；2.可以重复添加学生；3.如果添加学生出生日期不按格式填写，可能会导致图表错误
		//4. 添加的学生无法被条件查询；5.更新的学生信息会被条件查询还原且被错误查询；
		
	

