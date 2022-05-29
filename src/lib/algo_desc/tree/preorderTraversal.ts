import makeAlgoSource from "../makeAlgoSource";

const makeShower = (arr: number[]) => `
const root = [${arr.toString()}]; root.val = ${arr[0]}; root.left = [${arr[1]}, ${arr[2]}, ${arr[3]}]; root.right = [${arr[4]}, ${arr[5]}];
const two = root.left; two.val = ${arr[1]}; two.left = [${arr[2]}]; two.right = [${arr[3]}];
const three = two.left; three.val = ${arr[2]}; three.left = null; three.right = null;
const four = two.right; four.val = ${arr[3]}; four.left = null; four.right = null;
const five = root.right; five.val = ${arr[4]}; five.left = [${arr[5]}]; five.right = null;
const six = five.left; six.val = ${arr[5]}; six.left = null; six.right = null;

preorderTraversal(root) 

function preorderTraversal(root) {
  if (root === null) return [];              
  let arr = [], stack = [];
  stack.push(root);                        
  while (stack.length) {                   
    let top = stack[stack.length - 1];         
    if (top.left) {                    
      stack.push(top.left);               
      top.left = null;                
      arr.push(stack.top().val);  
    } else {                                   
      if (top.right) stack.push(top.right);
      stack.pop();
    }
  }
  return arr;  
};
`;

const desc = [
    "【前序遍历】初始化节点",
    "开始前序遍历",
    "若一开始为null，表示没有任何节点，返回空数组",
    "arr：存储前序遍历节点的顺序；s：存储节点的栈",
    "首先将根节点对象压入栈顶",
    "若栈不为空",
    "取得栈顶节点数组对象",
    "若其有左儿子,即left属性不为null",
    "将左儿子压入栈顶",
    "当前节点的left属性重置为空",
    "将当前节点的值压入队列",
    "若其没有左儿子,即left属性为null",
    "若其有右儿子，将其右儿子压入栈顶",
    "将栈顶弹出",
    "返回前序遍历序列数组",
    "算法演示结束"
];

const makeRealCode = (arr: number[]) => `
let arr = new SenkiLinkedNode("result")
const root = new SenkiLinkedNode(${arr[0]});
const two = new SenkiLinkedNode(${arr[1]});
const three = new SenkiLinkedNode(${arr[2]});
const four = new SenkiLinkedNode(${arr[3]});
const five = new SenkiLinkedNode(${arr[4]});
const six = new SenkiLinkedNode(${arr[5]});
root.left = two;
root.right = five;
two.left = three;
two.right = four;
five.left = six;
await wait({line: [1, 6], desc: 1});
await wait({line: [8, 8], desc: 2});
await inorderTraversal(root);
async function inorderTraversal(root) {
  if (root === null) return;             
  await wait({line: [11, 11], desc: 3});
  let s = [], flags = [];                        
  await wait({line: [12, 12], desc: 4});
  s.push(root);                         
  flags.push(root.flag("#ff0000"));
  await wait({line: [13, 13], desc: 5});
  while (s.length) {                       
    await wait({line: [14, 14], desc: 6});
    let top = s[s.length - 1];              
    await wait({line: [15, 15], desc: 7});
    if (top.left && !top.left.visited) {                    
      await wait({line: [16, 16], desc: 8});
      s.push(top.left);
      flags.push(top.left.flag("#ff0000"))
      await wait({line: [17, 17], desc: 9});
      top.left.visited = true             
      await wait({line: [18, 18], desc: 10});
    } else {
      await wait({line: [19, 19], desc: 11});
      let node = s.pop();
      if (node.right) node.right = null
      if (node.left) node.left = null
      arr.left = node
      arr = arr.left;
      await wait({line: [20, 20], desc: 12});
      flags.pop()();
      if (top.right) {
        s.push(top.right);
        flags.push(top.right.flag("#ff0000"))
      } 
      await wait({line: [21, 21], desc: 13});
    }
  }
  await wait({line: [24, 24], desc: 14})                         
};
`;
// 文本代码和真实代码相隔离
const makePreorderTraversalAlgoSource = (arr: number[] = []) => {
    arr = arr.slice(0, 6)

    // 随机放置数字，默认数组长度为6，数组长度为6，若大于6，只会显示6位；小于6，会补全
    for (let i = arr.length; i < 6; i++) {
        arr.push(Math.ceil(Math.random() * 100));
    }
    // 将文本代码与真实的代码隔离 这点设计的非常精妙 既可以看文本 又可以debug代码
    return makeAlgoSource(makeShower(arr), desc, makeRealCode(arr));
};

export default makePreorderTraversalAlgoSource;
