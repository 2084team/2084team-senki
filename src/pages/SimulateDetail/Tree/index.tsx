import React, { useLayoutEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tag, Input, Button } from "antd";
import { ControlTrack, useNormalStyles } from "../../../components";
import { C } from "../../../util";
import CodeDesc from "../CodeDesc";
import { Scene, SenkiLinkedNode } from "../../../lib/senki";
import {
  CodeContext,
  CodeControl,
  makeInorderTraversalAlgoSource,
  makeMinBinaryHeapAlgoSource,
  makeRedBlackTreeAlgoSource,
  makePreorderTraversalAlgoSource,
} from "../../../lib/algo_desc";
import { Link, useLocation } from "react-router-dom";
import BreadcrumbNav from "../BreadcrumbNav";

let scene: Scene;
let codeControl: CodeControl;
let makeAlgoSource = makeInorderTraversalAlgoSource;
let fakeCode: string = "",
  desc: string[] = [],
  realCode: string = "";

let tempTask: () => void | undefined; // 保存断点继续的执行函数

const SimulateDetail = () => {
  const classes = useStyles();
  const { flexRow, flexCol } = useNormalStyles();
  const [reviseArray, setReviseArray] = useState();
  const location = useLocation();
  const [status, setStatus] = useState<"stop" | "play" | "finish">("stop");
  const [codeInfo, setCodeInfo] = useState({ line: [-1, -1], desc: -1 });

  const statusRef = useRef(status);
  statusRef.current = status; // 没办法，为了在闭包函数里引用，只能干这种愚蠢操作。
  const canvas = useRef<HTMLCanvasElement>(null);

  const createNewCodeControl = () => {
    codeControl = new CodeControl(realCode);

    const handleWait = ({ info, resolve }: CodeContext) => {
      setCodeInfo(info);

      // 确定动画结束了再进行下一步
      const tryToNext = () => {
        if (statusRef.current === "play") {
          if (scene.isAnimAllOver()) resolve();
          else setTimeout(tryToNext, 100);
        } else tempTask = resolve;
      };

      setTimeout(tryToNext, 500);
    };

    const handleEnd = () => {
      setStatus("finish");
      setCodeInfo({ line: [-1, -1], desc: -1 });
    };

    const handleDestroy = () => {
      scene.removeAllChild();
      SenkiLinkedNode.senkiForest.destroyTree();
      SenkiLinkedNode.resetSenkiForest();
      scene.add(SenkiLinkedNode.senkiForest);
    };

    codeControl.on("wait", handleWait);
    codeControl.on("end", handleEnd);
    codeControl.on("destroy", handleDestroy);

    codeControl.start();
  };

  const handlePlay = () => {
    if (tempTask) tempTask();
    setStatus("play");
  };

  const handleRestart = () => {
    [fakeCode, desc, realCode] = makeAlgoSource(reviseArray);
    codeControl.destroy(); // 一定要记得销毁
    createNewCodeControl();
    setStatus("play");
  };

  const handleStop = () => {
    setStatus("stop");
  };

  const handleNext = () => {
    if (tempTask) tempTask();
  };

  const handleChangeSpeed = () => {};

  const reviseArrayInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      let data = JSON.parse(event.target.value);
      setReviseArray(data);
    } catch (err) {
      setReviseArray(undefined);
    }
  };

  useLayoutEffect(() => {
    scene = new Scene(canvas.current!);
    scene.add(SenkiLinkedNode.senkiForest);
    SenkiLinkedNode.setCanvasDimensions({
      width: scene.width,
      height: scene.height,
    });

    let path = location.pathname;
    // 这里的列表是在一个固定算法界面上的，而不是在主算法页上的
    if (/inorderTraversal/.test(path))
      makeAlgoSource = makeInorderTraversalAlgoSource;
    if (/minBinaryHeap/.test(path))
      makeAlgoSource = makeMinBinaryHeapAlgoSource;
    if (/redBlackTree/.test(path))
      makeAlgoSource = makeRedBlackTreeAlgoSource;
    if (/preorderTraversal/.test(path))
      makeAlgoSource = makePreorderTraversalAlgoSource;


    // 伪造代码 debug的代码描述 真实代码
    [fakeCode, desc, realCode] = makeAlgoSource();

    createNewCodeControl();

    return () => {
      codeControl.destroy(); // 一定要记得销毁
    };
  }, [canvas, location.pathname]);

  // 返回视图 fakeCode desc codeInfo url tag 等
  return (
    <div className={C(classes.container, flexCol)}>
      <BreadcrumbNav />
      <div className={C(classes.codeBox, flexRow)}>
        <CodeDesc code={fakeCode} desc={desc} info={codeInfo} />
        <canvas ref={canvas} className={classes.canvas}></canvas>
      </div>
      <div className={C(classes.operationArea, flexCol)}>
        <div className={flexRow}>
          <div className={classes.operationSingleArea}>
            <div style={{ padding: 24 }} className={classes.operationPart}>
              <Link to="/simulate-detail/tree/minBinaryHeap">
                <Tag color="magenta">最小堆</Tag>
              </Link>
              <Link to="/simulate-detail/tree/redBlackTree">
                <Tag color="cyan">红黑树</Tag>
              </Link>
              <Link to="/simulate-detail/tree/inorderTraversal">
                <Tag color="geekblue">中序遍历</Tag>
              </Link>
              <Link to="/simulate-detail/tree/preorderTraversal">
                <Tag color="red">前序遍历</Tag>
              </Link>
            </div>
          </div>
          <div className={classes.operationSingleArea}>
            <div className={classes.operationPart}>
              <div className={classes.reviseArrayInputButtonBox}>
                <div className={classes.reviseArrayInput}>
                  <Input
                    placeholder="输入数组，例：[1,2,3,4,5] 这种格式"
                    onChange={(event) => {
                      reviseArrayInputChange(event);
                    }}
                  />
                </div>
                <div>
                  <Button onClick={handleRestart}>确认</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ControlTrack
          status={status}
          speed={400}
          onPlay={handlePlay}
          onStop={handleStop}
          onRestart={handleRestart}
          onChangeSpeed={handleChangeSpeed}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default SimulateDetail;

const useStyles = makeStyles({
  container: {
    minHeight: "calc(100vh - 60px)",
  },
  breadNav: {
    padding: 13,
  },
  codeBox: {
    flex: 1,
  },
  canvas: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
  },
  operationArea: {
    margin: 13,
    height: "20vh",
    backgroundColor: "#2c303a",
  },
  operationPart: {
    // height: "47%",
    marginTop: "1%",
    marginBottom: "1%",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
  },
  operationSingleArea: {
    width: "48%",
    height: "100%",
    padding: "0.5%",
  },
  operationCode: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  reviseArrayInputButtonBox: {
    display: "flex",
    alignItems: "center",
  },
  reviseArrayInput: {
    width: "90%",
    marginRight: "5px",
  },
});
