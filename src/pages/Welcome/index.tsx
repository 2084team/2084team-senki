import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./index.css";

function Welcome() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.leftContent} style={{ color: "white" }}>
        <div className={classes.titleContainer}>
          <div className={classes.titleText}>Senki</div>
          <div className={classes.DesText}>
            2084 TEAM 算法,数据结构,操作系统可视化教学平台
            <div className={classes.subtitle}>
              Algorithms,data structures and os visualization platform
            </div>
          </div>
          <div className={classes.titleTip}>
            在Senki(千机)平台上，所有人都可以通过观看简单的可视化动画来轻松学习自己喜欢的算法和os相关知识。当然，你也可以成为平台的贡献者，利用Senki创造出无限的可能
          </div>
        </div>
        <Link to="/algo-simulate" className="startButton">
          GET STARTING
        </Link>
      </div>

      <div className={classes.rightContent}>
        <video
          style={{ borderRadius: "10px" }}
          width="600"
          height="400"
          controls
          poster="https://pic.amikara.com/2021-01-29-035212.png"
        >
          <source
            src="https://juminiyrepo.oss-cn-beijing.aliyuncs.com/2084team/2084team/senki.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}

export default Welcome;

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  container: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "calc(100vh - 60px)",
    display: "flex",
  },
  titleContainer: {
    width: "80%",
  },
  titleText: {
    color: "rgb(17, 93, 246)",
    fontSize: "5.5rem",
    fontWeight: 800,
    marginBottom: "15px",
  },
  DesText: {
    color: "rgb(13, 51, 128)",
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "30px",
  },
  subtitle: {
    fontSize: "20px",
  },
  titleTip: {
    fontSize: "1.125rem",
    margin: "0 0 1px",
    lineHeight: 1.6,
    color: "rgb(13, 51, 128)",
    opacity: 0.8,
  },
  leftContent: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  rightContent: {
    width: "50%",
    display: "flex",
    alignItems: "center",
  },
});
