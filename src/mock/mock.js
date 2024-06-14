import Mock from "mockjs"
// Mock.setup({
//     timeout: 1000
// })

// Mock.mock("请求地址","请求方式","回调函数")

//登录接口
Mock.mock("http://localhost:8080/user/login", "post", (req) => {
    const { username, password } = JSON.parse(req.body)
    if (username === "xuchao" && password === '123456') {
        return {
            code: 0,
            success: true,
            msg: "登录成功",
            token: "3arc9h0vhcr0f8iprpnscmfo8s",//token在登陆成功之后服务器会返回一个token令牌，之后每次发出请求的时候都要带上令牌
            nickname: "徐超",//昵称
            role: "admin"
        }
    } else {
        return {
            code: -1,
            success: false,
            msg: "该账号不存在"
        }
    }
})

//获取用户权限
Mock.mock("http://localhost:8080/user/getInfo", 'get', () => {
    return {
        code: 0,
        msg: "成功",
        data: {
            nickname: '徐超',
            role: 'admin'
        }
    }
})
//柱状图
Mock.mock("http://localhost:8080/user/bar", 'get', () => {
    return {
        code: 0,
        msg: '成功',
        data: {
            '1月': 200,
            '2月': 500,
            '3月': 500,
            '4月': 500,
            '5月': 300,
            '6月': 1200,
            '7月': 800,
            '8月': 380,
            '9月': 210,
            '10月': 900,
            '11月': 370,
            '12月': 790,
        }
    }
})
//折线图
Mock.mock("http://localhost:8080/user/line", 'get', () => {
    return {
        code: 0,
        msg: '成功',
        data:[
            {month:'1月',number:200},
            {month:'2月',number:500},
            {month:'3月',number:500},
            {month:'4月',number:500},
            {month:'5月',number:300},
            {month:'6月',number:1200},
            {month:'7月',number:800},
            {month:'8月',number:380},
            {month:'9月',number:210},
            {month:'10月',number:900},
            {month:'11月',number:370},
            {month:'12月',number:790},
        ]
    }
})
//饼图
Mock.mock("http://localhost:8080/user/pie", 'get', () => {
    return {
        code: 0,
        msg: '成功',
        data:[
            {name:'语文',value:300},
            {name:'数学',value:200},
            {name:'英语',value:200},
            {name:'物理',value:150},
            {name:'化学',value:50},
            {name:'生物',value:100}
        ]
    }
})
//校区销售额排名
Mock.mock("http://localhost:8080/user/saleRank", 'get', () => {
    return {
        code: 0,
        msg: '成功',
        data: [
            { campus: '北京校区', sales: 321223,r:1 },
            { campus: '深圳校区', sales: 321223,r:2 },
            { campus: '杭州校区', sales: 321223,r:3 },
            { campus: '青岛校区', sales: 321223,r:4 },
            { campus: '长沙校区', sales: 321223,r:5 },
            { campus: '南京校区', sales: 321223,r:6 },
            { campus: '上海校区', sales: 321223,r:7 },
        ]
    

        
    }
})
//操作动态
Mock.mock("http://localhost:8080/user/operate", 'get', () => {
    return {
        code: 0,
        msg: '成功',
        data: [
            {content:'王刚结算了一门课程',time:'操作时间 2020-09-18',color:'green'},
            {content:'王刚新增了一名学员',time:'操作时间 2020-09-25',color:'green'},
            {content:'黎明如删除了派排课录',time:'操作时间 2020-09-25',color:'red'},
            {content:'王丽丽审批了一笔订单',time:'操作时间 2020-09-26',color:'blue'},
            {content:'刘晓杰登陆了系统',time:'操作时间 2020-10-01',color:'gray'},
            {content:'王志登陆了系统',time:'操作时间 2020-10-01',color:'gray'},

        ]
    }
})
//教师管理表格数据
Mock.mock('http://localhost:8080/user/teacherList', 'post', (req) => {
    const { page, pageSize, name,subject,tel } = JSON.parse(req.body);
    console.log("教师列表接口接收到参数:", page, pageSize, name,subject,tel)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            // 随机生成pageSize条数据
            [`list|${pageSize}`]: [{
                'id|+1':1000,
                'name|1':['张三','李四','王五','韩立','韩梅梅','李丹丹','章七'],//姓名
                // 'name':Mock.Random.cname(),//姓名
                'gender|1':[1,2],//性别 1男2女
                'level|1':[1,2,3,4],//级别 1初级教师 2中级教师 3高级教师 4特级教师
                'grade|1':['初一','初二','初三','高一','高二','高三'],// 年级
                'subject|1':['语文','数学','英语','物理','化学','生物'],//科目
                'date':Mock.Random.date(),//入职日期
                'type|1':[1,2],//类型 1全职 2兼职
                'tel|1':['12345678541','18888888888','15236541235','45874236541','15210236974'],//手机号码
                'school|1':['北京大学','清华大学','河北大学','北京外国语大学','天津大学','南开大学'],//毕业院校
                'birth':Mock.Random.date(),//出生年月
                'address':Mock.Random.city(true),//家庭住址
                'education|1':['本科','硕士','博士'],//学历
            }],
            "total": 47
        })
    }
})
//新增教师
Mock.mock('http://localhost:8080/user/addTeacher', "post", (req) => {
    const { name,gender,level,grade,subject,date,type,tel,school,birth,address,education } = JSON.parse(req.body);
    // 后端拿到数据之后往数据库中存
    console.log("新增教师收到参数:", name,gender,level,grade,subject,date,type,tel,school,birth,address,education)
    return {
        code: 200,
        success: true,
        msg: "新建成功",
    }
})
//编辑教师  需要传入参数与新增教师一样再加上id
Mock.mock('http://localhost:8080/user/editTeacher', "post", (req) => {
    const { id,name,gender,level,grade,subject,date,type,tel,school,birth,address,education} = JSON.parse(req.body);
    // 后端拿到数据之后往数据库中存
    console.log("编辑教师收到参数:", id,name,gender,level,grade,subject,date,type,tel,school,birth,address,education)
    return {
        code: 200,
        success: true,
        msg: "编辑成功",
    }
})
//删除教师 传入参数id
Mock.mock('http://localhost:8080/user/deleteTeacher', "post", (req) => {
    const {id} = JSON.parse(req.body);
    // 后端拿到数据之后往数据库中存
    console.log("删除教师收到参数:", id)
    return {
        code: 200,
        success: true,
        msg: "删除成功",
    }
})
//批量删除教师  参数为id数组
Mock.mock('http://localhost:8080/user/batchDeleteTeacher', "post", (req) => {
    const {id} = JSON.parse(req.body);
    // 后端拿到数据之后往数据库中存
    console.log("批量删除教师收到参数:", id)
    return {
        code: 200,
        success: true,
        msg: "批量删除成功",
    }
})
//意向学员列表
Mock.mock('http://localhost:8080/user/intentionList', 'post', (req) => {
    const { page, pageSize, customer,leader } = JSON.parse(req.body);
    console.log("意向学员列表接口接收到参数:", page, pageSize,  customer,leader )
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            // 随机生成pageSize条数据
            [`list|${pageSize}`]: [{
                'id|+1':1000,
                'customer|1':['张三','李四','王五','韩立','韩梅梅','李丹丹','章七'],//姓名
                'gender|1':[1,2],//性别 1男2女
                'client|1':[1,2,3],// 客户状态 1待转化 2转化中 3转化成功  4转化失败
                'trial|1':[1,2],//试听状态 1未转试听 2已转试听
                'source|1':[1,2,3,4],// 招生来源  '1转介绍','2网站','3老带新','4门店'
                'tel|1':['12345678541','18888888888','15236541235','45874236541','15210236974'],//手机号码
                'grade|1':['初一','初二','初三','高一','高二','高三'],//年级
                'level|1':[1,2,3,4,5],//意向级别
                'leader|1':['张三','李四','王五','韩立','韩梅梅','李丹丹','章七'],//主负责人
            }],
            "total": 47
        })
    }
})
//新增意向学员
Mock.mock('http://localhost:8080/user/addIntention', "post", (req) => {
    const { customer,gender,client,trial,source,tel,grade,level,leader } = JSON.parse(req.body);
    // 后端拿到数据之后往数据库中存
    console.log("新增意向学员收到参数:", customer,gender,client,trial,source,tel,grade,level,leader)
    return {
        code: 200,
        success: true,
        msg: "新建成功",
    }
})

//编辑意向学员  需要传入参数与新增意向学员一样再加上id
Mock.mock('http://localhost:8080/user/editIntention', "post", (req) => {
    const { id,customer,gender,client,trial,source,tel,grade,level,leader } = JSON.parse(req.body);
    // 后端拿到数据之后往数据库中存
    console.log("编辑教师收到参数:",id,customer,gender,client,trial,source,tel,grade,level,leader)
    return {
        code: 200,
        success: true,
        msg: "编辑成功",
    }
})
//批量删除意向学员  参数为id数组
Mock.mock('http://localhost:8080/user/batchDeleteIntention', "post", (req) => {
    const {id} = JSON.parse(req.body);
    // 后端拿到数据之后往数据库中存
    console.log("批量删除意向学员收到参数:", id)
    return {
        code: 200,
        success: true,
        msg: "批量删除成功",
    }
})

//学生信息列表
Mock.mock('http://localhost:8080/user/studentList', "post", (req) => {
    const { page,pageSize,name,grade,subject,type,age,school } = JSON.parse(req.body);
    // 后端拿到数据之后往数据库中存
    console.log("新增意向学员收到参数:", page,pageSize,name,grade,subject,type,age,school)
    return {
        code: 200,
        success: true,
        msg:'成功',
        data: Mock.mock({
            // 随机生成pageSize条数据
            [`list|${pageSize}`]: [{
                'id|+1':1000,
                'name|1':['张三','李四','王五','韩立','韩梅梅','李丹丹','章七'],//姓名
                'age|1':[12,13,14,15,16,17,18,10],
                'grade|1':['初一','初二','初三','高一','高二','高三'],//年级
                'subject|1':['语文','数学','英语','物理','化学','生物'],
                'type|1':['一对一','大班','小班'],
                'pname|1':['张三','李四','王五','韩立','韩梅梅','李丹丹','章七'],
                'tel|1':['12345678541','18888888888','15236541235','45874236541','15210236974'],//手机号码
                'tname|1':['张三','李四','王五','韩立','韩梅梅','李丹丹','章七'],
                'school|1':['中心校区','顺义校区','大兴校区','昌平校区'],
                'hours|1':[23,25,40,3,67,12],
                'cost|1':[1,2],
                'expiration|1':[25,130,250,360,785,15]
            }],
            "total": 47
        })
    }
})
// 编辑学生信息
Mock.mock('http://localhost:8080/user/editStudent', "post", (req) => {
    const { id,name,age, grade,subject,type,pname,tel,tname,school,hours,cost,expiration} = JSON.parse(req.body);
    // 后端拿到数据之后往数据库中存
    console.log("编辑教师收到参数:", id,name,age, grade,subject,type,pname,tel,tname,school,hours,cost,expiration)
    return {
        code: 200,
        success: true,
        msg: "编辑成功",
    }
})
//员工信息，行政管理
Mock.mock('http://localhost:8080/user/administrativeList', 'get', (req) => {
    // const { page, pageSize, customer,leader } = JSON.parse(req.body);
    // console.log("行政管理列表接口接收到参数:", page, pageSize,  customer,leader )
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            // 随机生成pageSize条数据
            [`list|50`]: [{
                'id|+1':1,
                'tel|1':['12345678541','18888888888','15236541235','45874236541','15210236974'],//手机号码
                'nickname|1':['徐超','admin','王么没','寒梅么','李沐阳','小明卡'],
                'role|1':['admin','manager','teacher'] 
            }],
            "total": 50
        })
    }
})


//设置权限
Mock.mock('http://localhost:8080/user/setRole', 'post', (req) => {
    const { role } = JSON.parse(req.body);
    console.log("设置权限接口接收到参数:",role  )
    return {
        code: 200,
        success: true,
        message: "权限设置成功",
    }
})
