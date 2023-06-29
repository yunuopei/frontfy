import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Welcome from '../views/Welcome.vue'
import Vedio from "@/views/works/Vedio.vue";
import UserManage from "@/views/user/UserManage.vue";
import ImageManage from "@/views/works/ImageManage.vue";
import Manager from "@/views/feiyi/Manager.vue";
import Project from "@/views/feiyi/Project.vue";
import AddUser from "@/views/user/AddUser.vue";
import EditUser from "@/views/user/EditUser.vue";
import EditManager from "@/views/feiyi/EditManager.vue";
import AddManager from "@/views/feiyi/AddManager.vue";
import AddProject from "@/views/feiyi/AddProject.vue";
import EditProject from "@/views/feiyi/EditProject.vue";
import AddImage from "@/views/works/AddImage.vue";
import Login from "@/components/login/Login.vue";
import Register from "@/components/login/Register.vue";
import UserHome from "@/components/font/UserHome.vue";
import page2 from "@/components/font/page2.vue";
import page1 from "@/components/font/page1.vue";
import page3 from "@/components/font/page3.vue";
import Papper from "@/views/works/Papper.vue";
import AddPapper from "@/views/works/AddPapper.vue";
import UserHome2 from "@/components/font/UserHome2.vue";
import test from "@/components/font/test.vue";
import Report from "@/components/font/Report.vue";
import Guojia from "@/components/font/Guojia.vue";
import People from "@/components/font/People.vue";
import {List} from "echarts";
import ListProject from "@/components/font/ListProject.vue";
import Test from "@/components/font/test.vue";
import ProjectManager from "@/components/font/ProjectManager.vue";
import Projects from "@/components/font/Projects.vue";
import Resource from "@/components/font/Resource.vue";
import TuXiang from "@/components/font/resources/TuXiang.vue";
import Exhibition from "@/components/font/resources/Exhibition.vue";
import AudioAndVideo from "@/components/font/resources/AudioAndVideo.vue";
import Vedio0 from "@/views/works/Vedio0";
import ImageManage0 from "@/views/works/ImageManage0";
import Pappers from "@/components/font/Pappers";
import ErrorMessage from "@/views/ErrorMessage.vue";
import ImageDetail from "@/components/font/ImageDetail.vue";
import ImageDetail2 from "@/components/font/ImageDetail2.vue";
import VideoDetail from "@/components/font/VideoDetail.vue";
import VideoDetail2 from "@/components/font/VideoDetail2.vue";
import Page4 from "@/components/font/Page4.vue";
import test01 from "@/components/test/test01.vue";
import Personalcenter from "@/components/font/personal/Personalcenter.vue";
import Pmessage from "@/components/font/personal/Pmessage.vue";
import Pcollect from "@/components/font/personal/Pcollect.vue";
import Pimage from "@/components/font/personal/Pimage.vue";
import Pvideo from "@/components/font/personal/Pvideo.vue";
import Paudio from "@/components/font/personal/Paudio.vue";
import Prepair from "@/components/font/personal/Prepair.vue";
import Modifyimage from "@/components/font/personal/caozuo/Modifyimage.vue";
import ModifyVideo from "@/components/font/personal/caozuo/ModifyVideo.vue";
import ModifyAudio from "@/components/font/personal/caozuo/ModifyAudio.vue";
import Videos from "@/components/font/resources/Videos.vue";
import Pexhibition from "@/components/font/personal/Pexhibition.vue";
import AddExhibitionManage from "@/views/works/exhibition/AddExhibitionManage.vue";
import ExhibitionManage1 from "@/views/works/exhibition/ExhibitionManage1.vue";
import ExhibitionManage0 from "@/views/works/exhibition/ExhibitionManage0.vue";
import AudioManage0 from "@/views/works/AudioManage0.vue";
import AudioManage from "@/views/works/AudioManage.vue";
import AddWorks from "@/components/font/resources/AddWorks.vue";
import AddExhibitions from "@/components/font/resources/AddExhibitions.vue";
import AudioDetail from "@/components/font/AudioDetail.vue";
import AudioDetail2 from "@/components/font/AudioDetail2.vue";
import ExhibitionDetail from "@/components/font/resources/componement/ExhibitionDetail.vue";
import WorksDetails from "@/components/font/resources/componement/WorksDetails.vue";
import ExhibitionDetail2 from "@/components/font/resources/componement/ExhibitionDetail2.vue";

Vue.use(VueRouter)
const routes = [
	{
		path: '/test01',
		name: 'test01',
		component: test01,
	},
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/homeView',
		name: 'HomeView',
		component: HomeView
	},
	{
		path: '/homeView',
		name: 'HomeView',
		component: HomeView,
		redirect: "/index",
		meta: {
			requireAuth: true
		},
		children: [
			 {
				path: '/homeView/welcome',
				name: 'Welcome',
				component: Welcome,
				 meta: {
					 requireAuth: true
				 }
			},
			{
				path: '/homeView/vedio',
				name: 'Vedio',
				component: Vedio
			},
			{
				path: '/homeView/vedio0',
				name: 'Vedio0',
				component: Vedio0
			},
			{
				path: '/homeView/imageManage',
				name: 'ImageManage',
				component: ImageManage
			},
			{
				path: '/homeView/imageManage0',
				name: 'ImageManage0',
				component: ImageManage0
			},
			{
				path: '/homeView/userManage',
				name: 'UserManage',
				component: UserManage
			},
			{
				path: '/homeView/manager',
				name: 'Manager',
				component: Manager
			},
			{
				path: '/homeView/project',
				name: 'Project',
				component: Project
			},
			{
				path: '/addUser',
				name: 'AddUser',
				component: AddUser
			},
			{
				path: '/editUser',
				name: 'EditUser',
				component: EditUser
			},
			{
				path: '/addManager',
				name: 'AddManager',
				component: AddManager
			},
			{
				path: '/editManager',
				name: 'EditManager',
				component: EditManager
			},
			{
				path: '/addProject',
				name: 'AddProject',
				component: AddProject
			},
			{
				path: '/editProject',
				name: 'EditProject',
				component: EditProject
			},
			{
				path: '/addImage',
				name: 'AddImage',
				component: AddImage
			},
			{
				path: '/homeView/papper',
				name: 'Papper',
				component: Papper,
			},
			{
				path: '/addPapper',
				name: 'AddPapper',
				component: AddPapper,
			},
			{
				path: '/addExhibitionManage',
				name: 'AddExhibitionManage',
				component: AddExhibitionManage,
			},
			{
				path: '/homeView/exhibitionManage1',
				name: 'ExhibitionManage1',
				component: ExhibitionManage1,
			},
			{
				path: '/homeView/exhibitionManage0',
				name: 'ExhibitionManage0',
				component: ExhibitionManage0,
			},
			{
				path: '/homeView/audioManage0',
				name: 'AudioManage0',
				component: AudioManage0,
			},
			{
				path: '/homeView/audioManage',
				name: 'AudioManage',
				component: AudioManage,
			},


		]
	},
	{
		path: '/test',
		name: 'Test',
		component: Test
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
	},
	{
		path: '/userHome',
		name: 'UserHome',
		component: UserHome,
	},
	{
		path: '/userHome2',
		name: 'UserHome2',
		component: UserHome2,

		children: [
			{
				path: '/personalcenter',
				name: 'Personalcenter',
				component: Personalcenter,
				children:[
					{
						path: '/personalcenter/message',
						name: 'P-message',
						component: Pmessage,
					},
					{
						path: '/personalcenter/collect',
						name: 'Pcollect',
						component: Pcollect,
					},
					{
						path: '/personalcenter/image',
						name: 'Pimage',
						component: Pimage,
					},
					{
						path: '/personalcenter/video',
						name: 'Pvideo',
						component: Pvideo,
					},
					{
						path: '/personalcenter/audio',
						name: 'Paduio',
						component: Paudio,
					},
					{
						path: '/personalcenter/repair',
						name: 'Prepair',
						component: Prepair,
					},
					{
						path: '/personalcenter/modifyImage',
						name: 'Modifyimage',
						component: Modifyimage,
					},
					{
						path: '/personalcenter/modifyVideo',
						name: 'ModifyVideo',
						component: ModifyVideo,
					},
					{
						path: '/personalcenter/modifyAudio',
						name: 'ModifyAudio',
						component: ModifyAudio,
					},
					{
						path: '/personalcenter/exhibition',
						name: 'Pexhibition',
						component: Pexhibition,
					},
				]
			},
			{
				path: '/userHome2/report',
				name: 'Report',
				component: Report,
				children: [
					{
						path: '/userHome2/report/guojia',
						name: 'guojia',
						component: Guojia,
					},
					{
						path: '/userHome2/report/people',
						name: 'People',
						component: People,
					},

				],
			},
			{
				path: '/userHome2/pappers',
				name: 'Pappers',
				component: Pappers,
			},
			{
				path: '/userHome2/listProject',
				name: 'ListProject',
				component: ListProject,
				children:[
					{
						path: '/userHome2/listProject/projectManager',
						name: 'ProjectManager',
						component: ProjectManager,
					},
					{
						path: '/userHome2/listProject/projects',
						name: 'Projects',
						component: Projects,
					}
				]
			},
			{
				path: '/userHome2/resource',
				name: 'Resource',
				component: Resource,
				children:[
					{
						path: '/userHome2/resource/video',
						name: 'Videos',
						component: Videos,
					},
					{
						path: '/userHome2/resource/tuXiang',
						name: 'TuXiang',
						component: TuXiang,
					},
					{
						path: '/userHome2/resource/exhibition',
						name: 'Exhibition',
						component: Exhibition,
					},
					{
						path: '/userHome2/resource/audioAndVideo',
						name: 'AudioAndVideo',
						component: AudioAndVideo,
					},
				]
			},
			{
				path: '/userHome2/addWorks',
				name: 'AddWorks',
				component: AddWorks,
			},
			{
				path: '/userHome2/addExhibition',
				name: 'AddExhibition',
				component: AddExhibitions,
			},
			{
				path: '/userHome2/imageDetail',
				name: 'ImageDetail',
				component: ImageDetail,
			},
			{
				path: '/userHome2/imageDetail2',
				name: 'ImageDetail2',
				component: ImageDetail2,
			},
			{
				path: '/userHome2/videoDetail',
				name: 'VideoDetail',
				component: VideoDetail,
			},
			{
				path: '/userHome2/videoDetail2',
				name: 'VideoDetail2',
				component: VideoDetail2,
			},
			{
				path: '/userHome2/audioDetail',
				name: 'AudioDetail',
				component: AudioDetail,
			},
			{
				path: '/userHome2/audioDetail2',
				name: 'AudioDetail2',
				component: AudioDetail2,
			},
			{
				path: '/userHome2/exhibitionDetail',
				name: 'ExhibitionDetail',
				component: ExhibitionDetail,
			},
			{
				path: '/userHome2/worksDetails',
				name: 'WorksDetails',
				component: WorksDetails,
			},
			{
				path: '/userHome2/exhibitionDetail2',
				name: 'ExhibitionDetail2',
				component: ExhibitionDetail2,
			},
			{
				path: '/userHome2/page4',
				name: 'page4',
				component: Page4,
			},
		]
	},
	{
		path: '/page1',
		name: 'page1',
		component: page1,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/test',
		name: 'test',
		component: test,
	},
	{
		path: '/page2',
		name: 'page2',
		component: page2,
	},{
		path: '/page3',
		name: 'page3',
		component: page3,
	},{
		path: '/page4',
		name: 'page4',
		component: Page4,
	},
	{
		path: '/errorMessage',
		name: 'ErrorMessage',
		component: ErrorMessage,
	}
]

const router = new VueRouter({
	mode:'history',
	base: process.env.BASE_URL,
	routes
})

//配置路由拦截器
router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token')     //获取token
	if (to.meta.requireAuth) {                       //判断该路由是否需要登录权限
		if (token) {                                   //判断用户登录状态
			next()
		} else {
			next({
				path: '/errorMessage'
			})
		}
	} else {
		next()
	}
})
export default router
