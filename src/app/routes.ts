import {
  Welcome,
  NotFound,
  AlgoSimulate,
  VisualEditor,
  SimulateDetail,
} from "../pages";

type RouteItem = {
  path: string;
  exact?: boolean;
  component: React.FC;
};

/*** 前端路由改变
 * @author Alan
 * @date 2021.03.30
 * @function 前端路由迷惑,伪造php,jsp,asp.net等技术,迷惑攻击者
 */
export const routes: RouteItem[] = [
  {
    path: "/",
    exact: true,
    component: Welcome,
  },
  {
    path: "/welcome",
    component: Welcome,
  },
  {
    path: "/index.htm",
    component: Welcome,
  },
  {
    path: "/index.html",
    component: Welcome,
  },
  {
    path: "/index.php",
    component: Welcome,
  },
  {
    path: "/index.jsp",
    component: Welcome,
  },
  {
    path: "/index.asp",
    component: Welcome,
  },
  {
    path: "/algo-simulate",
    component: AlgoSimulate,
  },
  {
    path: "/simulate-detail/sort",
    component: SimulateDetail.Sort,
  },
  {
    path: "/simulate-detail/tree",
    component: SimulateDetail.Tree,
  },
  {
    path: "/simulate-detail",
    component: SimulateDetail.Sort,
  },
  {
    path: "/visual-editor",
    component: VisualEditor,
  },
  {
    path: "/404",
    component: NotFound,
  },
];

export default routes;
