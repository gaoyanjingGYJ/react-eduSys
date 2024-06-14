//全部的路由信息对照表
// import {HomeOutlined,UserOutlined,UsergroupAddOutlined} from '@ant-design/icons'
export const asyncRouterMap = [
    {
        path: '/home',
        name: 'Home',
        breadcrumbName: '首页',  
        meta: { title: '首页', role: ['admin', 'teacher', 'manager'],icon:'HomeOutlined'}
    }, {
        path: '/personal',
        name: "Personal",
        breadcrumbName: '个人中心',  
        meta: { title: '个人中心', role: ['admin', 'teacher', 'manager'],icon:'UserOutlined'}
    }, {
        path: '/teacher',
        name: "Teacher",
        breadcrumbName: '教师管理',  
        meta: { title: '教师管理', role: ['admin'],icon:'UsergroupAddOutlined' }
    },
     {
        path: '/admissions',
        name: "Admissions",
        breadcrumbName: '招生管理',  
        meta: { title: '招生管理', role: ['admin', 'manager'],icon:'MailOutlined' },
        children: [
            {
                path: '/admissions/intentional',
                name: "Intentional",
                breadcrumbName: '意向学员管理',  
                meta: { title: '意向学员管理', role: ['admin', 'manager'],icon:'SmileOutlined'}
            }, {
                path: '/admissions/solicitation',
                name: "Solicitation",
                breadcrumbName: '邀约查询',  
                meta: { title: '邀约查询', role: ['admin'],icon:'MessageOutlined' },
                
            }
        ]
    },
     {
        path: '/student',
        name: "Student",
        breadcrumbName: '学生管理',  
        meta: { title: '学生管理', role: ['admin', 'teacher', 'manager'],icon:'ContactsOutlined'},
        children: [
            {
                path: '/student/info',
                name: "Info",
                breadcrumbName: '学生信息',  
                meta: { title: "学生信息", role: ['admin', 'teacher', 'manager'],icon:'SolutionOutlined'}
            }, {
                path: '/student/exam',
                name: "Exam",
                breadcrumbName: '考试管理',  
                meta: { title: "考试管理", role: ['admin', 'teacher'],icon:'DashboardOutlined'}
            }
        ]
    },
     {
        path: '/class',
        name: "Class",
        breadcrumbName: '排课管理',  
        meta: { title: "排课管理", role: ['admin'] ,icon:'BarsOutlined'}
    },
     {
        path: '/administrative',
        name: "Administrative",
        breadcrumbName: '行政管理',  
        meta: { title: "行政管理", role: ['admin'] ,icon:'CarOutlined'}
    }, 
    {
        path: "/finance",
        name: "Finance",
        breadcrumbName: '财务管理',  
        meta: { title: "财务管理", role: ['admin'],icon:'MoneyCollectOutlined' }
    }
]
