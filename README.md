# web_activity

> 基于PC端Web开发 -- CSS规范

### File naming specification

CSS、Sass、Less 文件名以相应频道、模块的英文或拼音命名
Sass 文件用连字符 - 隔开，例如：shop-cart.scss

### CSS naming specification

css 全部定义在 class 内，id 只作为接口使用
class 以小写字母命名，用 - 分割，例如： header-menu
全局 class 以 xm 开头，例如： xm-header
js 接口用的 id、class 以 J_ 开头，后跟驼峰式命名，例如：J_miniCart
作为 js 接口的 class 内不得定义 css

### CSS Writing specification

每句属性定义必须独占一行

### Examples


``` bash
# bad
.selector { margin: 0; padding: 0; }

# good
.selector {
    margin: 0;
    padding: 0;
}
```

> 基于PC端Web开发 -- Javascript规范

### File naming specification

Js 文件名以相应频道、模块的英文或拼音命名;
Js 文件采用驼峰式命名，例如：shopCart.js;

### Basic formatting

缩进： 使用 2 个空格为一个缩进层级（设置编辑器TAB or EditorConfig ）
语句结尾： Javascript语句须以分号结尾，大多数压缩合并工具会自动添加分号

### Blank line

在方法之间、方法中局部变量与第一条语句之间、、行注释之前、逻辑片段之前

### Name

变量-驼峰大小写，
常量-大写以下划线连接，
函数-驼峰首单词为动词（can，has，is，get，set…），
构造函数-驼峰首字母大写

### Code example

  ``` bash
  # 变量-驼峰大小写
  var myName = 'Json';
  var number = 30;

  # 常量
  var MINI_NUM = 100;
  var ORDER_URL = 'http://order.xiaomi.com/';

  # 函数-首单词为动词
  function getName() {
    reutrn myName;
  }

  # 构造函数-驼峰首字母大写
  function Xiaomi(id){
    this.id = id;
  }

  var myId = new Xiaomi(143);
  ```

### Notes

目的：自己或其他人能快速读懂代码，对文档生成工具友好YUI DOC注释遵循代码格式化；所有函数、方法、构造函数须使用文档注释

tips：编辑器sublime text 安装DocBlockr插件，在function上一行输入/**，然后按Tab就自动补全注释

### Sentence & Expression

块语句须使用大括号（if，for，while，try catch….)，
第一个大括号在块语句第一句末尾，
块语句间隔-在左小括号之前和右小括号之后添加一个空格

### Code example

  ``` bash
  function Name ( obj ) {
    if( arguments ) {
      return false;
    }
  }
 ```

for 循环 保留对break，continue来控制数组的迭代；
for in 循环-hasOwnProperty()来过滤出实例属性且禁止使用它来遍历数组成员；

### Code example

  ``` bash
  for ( target in object ) {
    if ( object.hasOwnProperty(target) ) {
      console.log( 'value is ' + object[target] );
    }
  }
  ```

### Switch Sentence

事实上javascrpt 的 switch 语句中可以使用任意类型的值及表达式作为case从句；
每条case语句相对于switch关键字保持一个缩进层级；
从第2条case语句开始，每条case语句前后有一个空行；
非特殊情况下不允许case语句“连续执行”，结尾须有break，return，throw；
我们更倾向于即使没有默认行为也需要保留default

### Code example

  ``` bash
  switch( condition ) {
    case 'first':
    # do something
    break;

    case 'second':
    # do someting
    break;

    default:
    # do someting
  }
  ```

> 基于PC端Web开发 -- 禁止使用with语句

## 变量&函数&运算符&字符串

### 1、变量

所有变量必须使用var声明；
一个 var 声明多个变量，容易导致较长的行长度，并且在修改时容易造成逗号和分号的混淆；
同一作用域的变量都提前之函数的顶部，且我们推荐每个变量都用 var 语句声明，每个变量独占一行；

### Code example

  ``` bash
  function doSomething ( obj ) {
    var value = 10;
    var result = value + 10;
    var i;
    var lens;

    for ( i = 0, len = obj.length; i < len; i++ ){
      #dosomething
    }
  }
  ```

### 2、函数

函数调用在函数声明之后，调用函数名与左括号无空格

### Code example

  ``` bash
  function doSomething(name) {
    console.log(name + ' say:Hello world!');
  }

  doSomethings('chenfx');
  ```

即时函数（立即调用函数）必须使用小括号包裹

### Code example

  ``` bash
  var name = (function() {
    # dosomething
    return {
      value: 'jsonbeta'
    }
  }());
  ```

### 3、运算符

推荐局部作用域使用严格模式 “use strict”；
使用 === !== 避免使用 == !=；
推荐使用对象字面量来代替原始包装类型

### Code example

  ``` bash
  # bad
  var name = new String('jsonbeta');
  var isMan = new Boolean(true);
  var length = new Number(10);

  # good
  var name = 'jsonbeta';
  var isMan = true;
  var length = 10;
  ```

### 4、字符串

字符串开头和结束使用单引号 '；
输入单引号不需要按住 shift，方便输入。；
实际使用中，字符串经常用来拼接 HTML。为方便 HTML 中包含双引号而不需要转义写法。

### Code example

  ``` bash
  var str = '我是一个字符串';
  var html = '<div class="cls">拼接HTML可以省去双引号转义</div>';
  ```

### 5、jQuery

使用 $ 作为存储 jQuery 对象的变量名前缀。

  ``` bash
  # bad
  var sidebar = $('.sidebar');

  # good
  var $sidebar = $('.sidebar');
  缓存 jQuery 查询。

  # bad
  function setSidebar() {
    $('.sidebar').hide();

    # ...stuff...

    $('.sidebar').css({
      'background-color': 'pink'
    });
  }

  # good
  function setSidebar() {
    var $sidebar = $('.sidebar');
    $sidebar.hide();

    # ...stuff...

    $sidebar.css({
      'background-color': 'pink'
    });
  }
  ```

对 DOM 查询使用层叠 $('.sidebar ul') 或 父元素 > 子元素 $('.sidebar > ul')

对有作用域的 jQuery 对象查询使用 find

  ``` bash
  # bad
  $('ul', '.sidebar').hide();

  # bad
  $('.sidebar').find('ul').hide();

  # good
  $('.sidebar ul').hide();

  # good
  $('.sidebar > ul').hide();

  # good
  $sidebar.find('ul').hide();
  ```

> 基于PC端Web开发 -- Html规范

### 文件命名规范

Html 文件 全小写字母 命名，例如：index.html，不要用连字符或驼峰格式命名。

### 基本规范

使用符合语义的标签书写 HTML 文档, 选择恰当的元素表达所需的含义;
元素的标签和属性名必须小写, 属性值必须加双引号;
元素嵌套遵循 (X)HTML Strict 嵌套规则, 推荐使用Firefox插件 HTML Validator 进行检查;
正确区分自闭合元素和非自闭合元素. 非法闭合包括：<br>..</br>、<script />、<iframe />, 非法闭合会导致页面嵌套错误问题;
通过给元素设置自定义属性来存放与 JavaScript 交互的数据, 属性名格式为 data-xx (例如：data-lazyload-url)
特殊字符需转义，如：> => &gt; ，具体参照 HTML特殊转义字符列表

### 文档模板

DOCTYPE
页面文档类型统一使用HTML5 DOCTYPE. 代码如下：

<!doctype html>
编码

声明方法遵循HTML5的规范.

<meta charset="utf-8" />

### 注释

建议对超过10行的页面模块进行注释, 以降低开发人员的嵌套成本和后期的维护成本. 例如：

<div class="header">
    ...
</div>
<!-- ###header END -->

<div class="footer">
    ...
</div>
<!-- footer END -->

## 元素
 
### 结构性元素

p 表示段落. 只能包含内联元素, 不能包含块级元素;
div 本身无特殊含义, 可用于布局. 几乎可以包含任何元素;
br 表示换行符;
hr 表示水平分割线;
h1-h6 表示标题. 其中 h1 用于表示当前页面最重要的内容的标题;
blockquote 表示引用, 可以包含多个段落. 请勿纯粹为了缩进而使用 blockquote, 大部分浏览器默认将 blockquote 渲染为带有左右缩进;
pre 表示一段格式化好的文本;

### 头部元素

title 每个页面必须有且仅有一个 title 元素;
base 可用场景：首页、频道等大部分链接都为新窗口打开的页面;
link 用于引入css资源时, 可省去 media(默认为all) 和 type(默认为text/css) 属性;
style type 默认为 text/css, 可以省去;
script type 属性可以省去; 不赞成使用lang属性; 不要使用古老的<!– //–>这种hack脚本, 它用于阻止第一代浏览器(Netscape 1和Mosaic)将脚本显示成文字;
noscript 在用户代理不支持 JavaScript 的情况下提供说明;

### 文本元素

a 在href属性时表示链接, 无href属性但有 name 属性表示锚点;
em,strong em 表示句意强调, 加与不加会引起语义变化, 可用于表示不同的心情或语调; strong 表示重要性强调, 可用于局部或全局, strong强调的是重要性, 不会改变句意;
abbr 表示缩写;
sub,sup 主要用于数学和化学公式, sup还可用于脚注;
span 本身无特殊含义;
ins,del 分别表示从文档中增加(插入)和删除

### 媒体元素

img 请勿将img元素作为定位布局的工具, 不要用他显示空白图片; 必要时给 img 元素增加alt属性
object 可以用来插入Flash

### 列表元素

dl 表示关联列表, dd是对dt的解释; dt和dd的对应关系比较随意：一个dt对应多个dd、多个dt对应一个dd、多个dt对应多个dd, 都合法; 可用于名词/单词解释、日程列表、站点目录;
ul 表示无序列表;
ol 表示有序列表, 可用于排行榜等;
li 表示列表项, 必须是ul/ol的子元素;

### 表单元素

推荐使用 button 代替 input, 但必须声明 type;
推荐使用 fieldset, legend 组织表单;
表单元素的 name 不能设定为 action, enctype, method, novalidate, target, submit 会导致表单提交混乱;
-- EOF --
