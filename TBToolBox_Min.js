var $TB=new Object;$TB.Mouse=new Object,$TB.Mouse.X=-1,$TB.Mouse.Y=-1,$TB.Mouse.Left=!1,$TB.Mouse.Middle=!1,$TB.Mouse.Right=!1,document.addEventListener("mouseup",function(e){switch(e.buttons){case 0:$TB.Mouse.Left=!1,$TB.Mouse.Middle=!1,$TB.Mouse.Right=!1;break;case 1:$TB.Mouse.Left=!0,$TB.Mouse.Middle=!1,$TB.Mouse.Right=!1;break;case 2:$TB.Mouse.Left=!1,$TB.Mouse.Middle=!1,$TB.Mouse.Right=!0;break;case 3:$TB.Mouse.Left=!0,$TB.Mouse.Middle=!1,$TB.Mouse.Right=!0;break;case 4:$TB.Mouse.Left=!1,$TB.Mouse.Middle=!0,$TB.Mouse.Right=!1;break;case 5:$TB.Mouse.Left=!0,$TB.Mouse.Middle=!0,$TB.Mouse.Right=!1;break;case 6:$TB.Mouse.Left=!1,$TB.Mouse.Middle=!0,$TB.Mouse.Right=!0;break;case 7:$TB.Mouse.Left=!0,$TB.Mouse.Middle=!0,$TB.Mouse.Right=!0}}),document.addEventListener("mousedown",function(e){switch(e.buttons){case 0:$TB.Mouse.Left=!1,$TB.Mouse.Middle=!1,$TB.Mouse.Right=!1;break;case 1:$TB.Mouse.Left=!0,$TB.Mouse.Middle=!1,$TB.Mouse.Right=!1;break;case 2:$TB.Mouse.Left=!1,$TB.Mouse.Middle=!1,$TB.Mouse.Right=!0;break;case 3:$TB.Mouse.Left=!0,$TB.Mouse.Middle=!1,$TB.Mouse.Right=!0;break;case 4:$TB.Mouse.Left=!1,$TB.Mouse.Middle=!0,$TB.Mouse.Right=!1;break;case 5:$TB.Mouse.Left=!0,$TB.Mouse.Middle=!0,$TB.Mouse.Right=!1;break;case 6:$TB.Mouse.Left=!1,$TB.Mouse.Middle=!0,$TB.Mouse.Right=!0;break;case 7:$TB.Mouse.Left=!0,$TB.Mouse.Middle=!0,$TB.Mouse.Right=!0}}),document.addEventListener("mousemove",function(e){$TB.Mouse.X=e.pageX,$TB.Mouse.Y=e.pageY}),window.addEventListener("blur",function(){$TB.MouseX=-1,$TB.MouseY=-1,$TB.Mouse.Left=!1,$TB.Mouse.Middle=!1,$TB.Mouse.Right=!1}),$TB.SBarWidth=function(){var e=document.createElement("div");e.style.top="0px",e.style.left="0px",e.style.width="200px",e.style.height="150px",e.style.position="absolute",e.style.visibility="hidden",e.style.overflow="hidden",document.getElementsByTagName("body")[0].appendChild(e);var t=document.createElement("div");t.style.width="100%",t.style.height="200px",e.appendChild(t);var o=t.offsetWidth;e.style.overflow="scroll";var n=e.clientWidth;return document.getElementsByTagName("body")[0].removeChild(e),o-n},$TB.ScrollBarWidth="10px",window.addEventListener("resize",function(e){e.target===window&&$TB.WindowResize()}),$TB.WindowResize=function(){$TB.ScrollBarWidth=$TB.SBarWidth(),document.dispatchEvent($TB.CssRefresh)};var TBready=setInterval(function(){"complete"===document.readyState&&(clearInterval(TBready),$TB.WindowResize())},10);$TB.Css=new Object,$TB.Css.get=function(e,t){return window.getComputedStyle(e).getPropertyValue(t).trim()},$TB.Css.stringify=function(e){var t="";for(var o in e){t=t+o.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()+": "+e[o]+"; "}return t},$TB.Css.parse=function(e){for(var t,o=/([\w-]*)\s*:\s*([^;]*)/g,n={};t=o.exec(e);){var i=t[1];n[i=i.replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})]=t[2].trim()}return n},$TB.CssRefresh=new CustomEvent("CssRefresh",{detail:{},bubbles:!1,cancelable:!1});class TB_ComboBox extends HTMLElement{constructor(){super();var e,t,o,n,i=this,r=100,s=10,l=50,a=null,d="",u=-1,c=0,h="",p="",f=!0,b=!0,v=!1;i.Loaded=!1,i._appendChild=i.appendChild,i._insertBefore=i.insertBefore,i.change=function(e){var t=new CustomEvent("change",{detail:{},bubbles:!1,cancelable:!1});i.dispatchEvent(t)},i.input=function(e){var t=new CustomEvent("input",{detail:{},bubbles:!1,cancelable:!1});i.dispatchEvent(t)},i.List=new Array,i.options=new Object,i.addEventListener("blur",function(e){b?(0==B.value.length&&(f=!0,B.value=p,i.setAttribute("empty","")),i.removeAttribute("focus")):(e.stopImmediatePropagation(),e.preventDefault())},!1),i.addEventListener("focus",function(e){f&&(f=!1,B.value="",i.removeAttribute("empty")),i.setAttribute("focus","")},!1),i.addEventListener("mouseenter",function(e){b=!0,i.hasAttribute("hover")?(e.stopImmediatePropagation(),e.preventDefault()):i.setAttribute("hover","")},!1),i.addEventListener("mouseleave",function(e){b?i.hasAttribute("hover")&&(S(),i.removeAttribute("hover")):(e.stopImmediatePropagation(),e.preventDefault())},!1),i.addEventListener("keydown",function(e){switch(e.keyCode){case 13:"inherit"==y.style.visibility&&(u in i.List?i.key=i.List[u]:i.value=B.value);break;case 9:i.value=B.value;break;case 38:"inherit"==y.style.visibility&&(i.ListPosition=u-1);break;case 40:"inherit"==y.style.visibility&&(i.ListPosition=u+1);break;default:B.focus()}},!1);var g=this.attachShadow({mode:"open",delegatesFocus:!0});g.innerHTML="".concat("<style>",":host","{","height: 20px;","width: 100px;","margin: 0px;","position: absolute;","display: block;","cursor: text;","text-align: left;","font-size: 12px;","font-family: 'Times New Roman';","color: #000000;","background-color: #FFFFFF;","border: 1px solid #000000;","outline: none;","overflow: hidden;","padding: 0px;","--tbDropHeight: 100px;","--tbPaddingLeft: 12px;","--tbScrollBar_width: 20px;","--tbScrollBar_height: 20px;","--tbUpButton: var(--imgUpButton);","--tbVButton: var(--imgVButton);","--tbDownButton: var(--imgDownButton);","--tbArrow: var(--imgDownButton);","--tbArrowFill: #041FD3;","--tbDirection: auto;","}",":host([empty])","{","color: #CCCCCC;","}",":host([disabled])","{","pointer-events: none;","cursor: inherit;","}",":host([readonly])","{","background-color: #AAAAAA;","}","#tbFog","{","top: 0px;","left: 0px;","height: 100%;","width: 100%;","margin: 0px;","padding: 0px;","position: absolute;","background-color: #000000;","opacity: 0.5;","display: none;","}",":host([disabled]) #tbFog","{","display: inherit;","}","#tbArrow","{","top: 0px;","left: 0px;","height: 100%;","width: 100%;","margin: 0px;","padding: 0px;","position: absolute;","cursor: pointer;","background-image: var(--tbArrow);","background-repeat: no-repeat;","background-size: contain;","background-position: right;","background-color: var(--tbArrowFill);","}","#tbInput","{","top: 0px;","left: 0px;","height: 100%;","margin: 0px;","padding-left: var(--tbPaddingLeft);","padding-top: 0px;","padding-bottom: 0px;","position: absolute;","overflow: hidden;","border: none;","outline: none;","color: inherit;","background-color: inherit;","cursor: inherit;","text-align: inherit;","font-family: inherit;","font-size: inherit;","}","#tbDropbox","{","top: 0px;","left: 0px;","height: 1px;","margin: 0px;","position: absolute;","border-left: 1px outset #000000;","border-right: 1px outset #000000;","background-color: #FFFFFF;","visibility: hidden;","display: flex;","flex-flow: column nowrap;","--tbOverflow: auto;","--tbScrollBar_width: inherit;","--tbScrollBar_height: inherit;","--tbUpButton: inherit;","--tbVButton: inherit;","--tbDownButton: inherit;","}",":host([open]) #tbDropbox","{","z-index: 99999;","}","</style>","<tb-div id = 'tbDropbox'><slot id = 'ComboSlot' name = 'ComboSlot' slot = 'DivSlot'></slot></tb-div>","<div id = 'tbArrow'></div>","<input id = 'tbInput' type = 'text'></input>","<div id = 'tbFog'></div>","");var B=g.getElementById("tbInput");B.addEventListener("focus",function(e){i.disabled&&B.blur()},!1),B.addEventListener("change",function(e){b&&(i.value=B.value)},!1),B.addEventListener("input",function(e){B.value.length>0&&i.hasAttribute("autocomplete")?(B.value.substring(0,h.length)==h&&0!=h.length||(i.List=L()),T(i.List,"^"+B.value),h=B.value,0!=i.List.length?(i.hasAttribute("open")||(i.ListPosition=0),w()):S()):S(),i.input()},!1);var m=g.getElementById("tbArrow");m.addEventListener("mousedown",function(e){"inherit"==y.style.visibility?S():(i.List=L(),T(i.List,"*"),w())},!1);var y=g.getElementById("tbDropbox");y.addEventListener("mouseleave",function(e){e.stopImmediatePropagation(),e.preventDefault()},!1),Object.defineProperties(i,{autocomplete:{get:function(){return i.hasAttribute("autocomplete")},set:function(e){e?i.setAttribute("autocomplete",""):i.removeAttribute("autocomplete")}}}),Object.defineProperties(i,{autoRefresh:{get:function(){return Irefresh},set:function(e){y.autoRefresh=!!e}}}),Object.defineProperties(i,{disabled:{get:function(){return i.hasAttribute("disabled")},set:function(e){e?i.setAttribute("disabled",""):i.removeAttribute("disabled")}}}),Object.defineProperties(i,{readOnly:{get:function(){return i.hasAttribute("readonly")},set:function(e){e?(i.setAttribute("readonly",""),B.readOnly=!0,m.style.pointerEvents="none",S()):(i.removeAttribute("readonly"),B.readOnly=!1,m.style.pointerEvents="auto")}}}),Object.defineProperties(i,{defaultText:{configurable:!1,get:function(){return p},set:function(e){p=e,!i.hasAttribute("focus")&&i.hasAttribute("empty")&&(B.value=p)}}}),Object.defineProperties(i,{ListId:{configurable:!1,get:function(){return c},set:function(e){e in i.options&&(i.ListPosition=i.List.indexOf(e.toString()))}}}),Object.defineProperties(i,{ListPosition:{configurable:!1,get:function(){return u},set:function(e){if(c in i.options&&(i.options[c].selected=!1),0!=i.List.length){u=e>i.List.length-1?0:e<0?i.List.length-1:e,c=i.List[u],i.options[c].selected=!0;var t=i.options[c].offsetTop,o=i.options[c].offsetHeight,n=y.tbScrollTop;t-n<0?y.tbScrollTop=t:t+o-n>l&&(y.tbScrollTop=t+o-l)}else u=-1}}}),Object.defineProperties(i,{key:{configurable:!1,get:function(){return a},set:function(e){var t=a;e in i.options?(f=!1,i.removeAttribute("empty"),B.value=i.options[e].value,d=i.options[e].value,a=e):(f=!0,i.hasAttribute("focus")?B.value="":(i.setAttribute("empty",""),B.value=p),d="",a=null),S(),t!=a&&i.change()}}}),Object.defineProperties(i,{value:{configurable:!1,get:function(){return d},set:function(e){var t=a,o=e+"";if(o=o.toUpperCase().trim(),a=null,o.length>0){for(var n in f=!1,i.removeAttribute("empty"),i.options)if((i.options[n].value+"").toUpperCase().trim()==o){a=n,e=i.options[n].value;break}}else f=!0,i.hasAttribute("focus")||(i.setAttribute("empty",""),e=p);B.value=e,S(),t!=a?(d=B.value,i.change()):d!=B.value&&(i.strict?a?i.key=a:(d="",B.value=""):(d=B.value,i.change()))}}}),Object.defineProperties(i,{strict:{get:function(){return i.hasAttribute("strict")},set:function(e){e?(i.setAttribute("strict",""),i.value=i.value,a?i.key=a:(d="",B.value="")):i.removeAttribute("strict")}}}),i.select=function(){B.select()},i.Load=function(e){var t,o=d;i.Clear(),i.autoRefresh=!1;for(var n=0;n<e.length;n++){var r=document.createElement("tb-option");r.Id=e[n].Id,r.value=e[n].Value,r.style.order=n,i.appendChild(r),o==r.value&&(t=r.Id)}i.autoRefresh=!0,t?i.key=t:i.value=o},i.Add=function(e,t){var o=document.createElement("tb-option");o.Id=e,o.value=t,i.appendChild(o)},i.remove=function(e){e in i.options&&(i.removeChild(i.options[e]),delete i.options[e])},i.Clear=function(){for(var e in i.options)i.remove(e);a=null,d="",B.value=""},i.Sort=function(e){for(var t=new Array,o=0;o<e.length;o++){var n=e[o]+"";i.options[n].style.order=o,"block"==i.options[n].style.display&&t.push(n)}i.List=t},i.appendChild=function(e){if(!("Id"in e&&"value"in e))throw"Invaild option for tbComboBox";var o=e.Id;if(o in i.options)throw"Duplicate key in tbComboBox";i.options[o]=e,e.slot="ComboSlot",e.addEventListener("mouseenter",function(e){i.ListId=this.Id,b=!1},!1),e.addEventListener("mouseleave",function(e){b=!0},!1),e.addEventListener("click",function(e){i.input(),i.key=o},!1),i._appendChild(e),(v||i.hasAttribute("open"))&&T(L(),t)},i.insertBefore=function(e,o){if(!("Id"in e&&"value"in e))throw"Invaild option for tbComboBox";var n=e.Id+"";if(n in i.options)throw"Duplicate key in tbComboBox";i.options[n]=e,e.slot="ComboSlot",e.addEventListener("mouseenter",function(e){i.ListId=n,b=!1},!1),e.addEventListener("mouseleave",function(e){b=!0},!1),e.addEventListener("click",function(e){i.input(),i.key=n},!1),i._insertBefore(e,o),(v||i.hasAttribute("open"))&&T(L(),t)},i.refresh=function(){i.Loaded&&(i.Loaded=!1,B.offsetParent?x():o||(o=new ResizeObserver(function(e){o.disconnect(),x()})).observe(B),n=$TB.Css.get(i,"--tbDirection"),i.Loaded=!0)};var x=function(){s=i.clientHeight,r=i.clientWidth;var e=$TB.Css.get(i,"--tbDropHeight");if(e){var t=y.clientHeight;y.style.height=e,l=y.clientHeight,y.style.height=t+"px"}var o=parseInt($TB.Css.get(y,"border-left-width"))?parseInt($TB.Css.get(y,"border-left-width")):0,n=parseInt($TB.Css.get(y,"border-right-width"))?parseInt($TB.Css.get(y,"border-right-width")):0;B.style.width=r-parseInt($TB.Css.get(B,"padding-left")||0)-s+"px",B.style.height=s+"px",B.style.lineHeight=s+"px",y.style.width=r-o-n+"px",y.style.tbBarSize=s+"px"},L=function(){var e=new Array,t=new Array;for(var o in i.options){if(""==i.options[o].style.order){for(var n=new Array,r=0;r<i.childNodes.length;r++)n.push(i.childNodes[r].Id+"");return n}t.push([o,Number(i.options[o].style.order)])}t.sort(function(e,t){return(e=e[1])<(t=t[1])?-1:e>t?1:0});for(var s=0;s<t.length;s++)e.push(t[s][0]);return e},T=function(e,o){var n,r,s=new Array;if(t=o,"*"==o){for(var l in e)r=e[l],i.options[r].style.display="block",s.push(r);i.List=s,i.ListPosition=0}else{for(var l in n=new RegExp(o,"i"),e)r=e[l],n.test(i.options[r].value)?(i.options[r].style.display="block",s.push(r)):i.options[r].style.display="none";i.List=s,i.List.indexOf(i.ListId)<0&&(i.ListPosition=0)}},w=function(){v=!0,requestAnimationFrame(function(){if(u<0)var t=0;else t=u;var o,r=i.options[i.List[i.List.length-1]]||0,a=i.options[i.List[t]]||0,d=r.clientHeight+r.offsetTop||0,c=a.clientHeight+a.offsetTop||0,h=$TB.Css.parse(y.style.cssText),p=i.getBoundingClientRect(),f=parseInt($TB.Css.get(i,"border-top-width"))?parseInt($TB.Css.get(i,"border-top-width")):0,b=parseInt($TB.Css.get(i,"border-bottom-width"))?parseInt($TB.Css.get(i,"border-bottom-width")):0,g=(parseInt($TB.Css.get(i,"border-left-width"))?parseInt($TB.Css.get(i,"border-left-width")):0)+p.left;if(0==i.List.length?h.height=s+"px":d<l?h.height=d+"px":(h.height=l+"px",y.tbScrollTop=c-l),"down"==n)o=s+f+b+p.top,delete h["border-top"],h["border-bottom"]="1px outset #000000";else if("up"==n)o=p.top-parseInt(h.height)-1,delete h["border-bottom"],h["border-top"]="1px outset #000000";else if("auto"==n){var B=i.offsetTop+s+f+b+(parseInt(h.height)+1),m=p.top+s+f+b+(parseInt(h.height)+1),x=i.offsetTop-(parseInt(h.height)+1),L=p.top-(parseInt(h.height)+1),T=document.documentElement.clientHeight||window.innerHeight;(B>i.offsetParent.clientHeight||m>T)&&!(x<0||L<0)?(o=p.top-parseInt(h.height)-1,delete h["border-bottom"],h["border-top"]="1px outset #000000"):(o=s+f+b+p.top,delete h["border-top"],h["border-bottom"]="1px outset #000000")}h.top=o+"px",h.left=g+"px",h.position="fixed",h.visibility="inherit",y.style.cssText=$TB.Css.stringify(h),i.setAttribute("open",""),v=!1,clearInterval(e),e=setInterval(function(){var e=i.getBoundingClientRect();p.top==e.top&&p.left==e.left||S()},100)})},S=function(){if(i.hasAttribute("open")){clearInterval(e),i.removeAttribute("open");var t=$TB.Css.parse(y.style.cssText);t.top="0px",t.left="0px",t.position="absolute",t.visibility="hidden",y.style.cssText=$TB.Css.stringify(t)}};i.setAttribute("empty",""),document.addEventListener("CssRefresh",function(){i.refresh()},!1),i.Loaded=!0}connectedCallback(){for(let e=0;e<this.childNodes.length;e++)!this.childNodes[e].Id||this.childNodes[e].Id in this.options||this.appendChild(this.childNodes[e]);this.refresh()}static get observedAttributes(){return["style","class"]}attributeChangedCallback(e,t,o){this.Loaded&&this.refresh()}set onchange(e){"function"==typeof e&&this.addEventListener("change",function(t){e()},!1)}set onfocus(e){"function"==typeof e&&this.addEventListener("focus",function(t){e()},!1)}set onblur(e){"function"==typeof e&&this.addEventListener("blur",function(t){e()},!1)}}customElements.define("tb-combobox",TB_ComboBox);class TB_Div extends HTMLElement{constructor(){super();var e,t,o,n,i=this,r=0,s=0,l=0,a=0,d="auto",u="auto",c=!1,h=!0;i.Loaded=!1,i._appendChild=i.appendChild,i._insertBefore=i.insertBefore,i.tbScroll=function(e){var t=new CustomEvent("tbScroll",{detail:{},bubbles:!1,cancelable:!1});i.dispatchEvent(t)},i.resize=function(e){var t,o;t=i.style.height?i.style.height:r,o=i.style.width?i.style.width:s;var n=new CustomEvent("resize",{detail:{height:t,width:o},bubbles:!1,cancelable:!1});i.dispatchEvent(n)},i.addEventListener("scroll",function(e){i.scrollTop=0,i.scrollLeft=0}),i.addEventListener("mouseenter",function(e){i.hasAttribute("hover")||i.setAttribute("hover","")},!1),i.addEventListener("mouseleave",function(e){i.hasAttribute("hover")&&i.removeAttribute("hover")},!1);var p=this.attachShadow({mode:"open",delegatesFocus:!0});p.innerHTML="".concat("<style>",":host","{","margin: 0px;","padding: 0px;","position: absolute;","overflow: hidden;","outline: none;","--tbOverflow: auto;","--tbOverflowX: '';","--tbOverflowY: '';","--tbScrollBar_width: 20px;","--tbScrollBar_height: 20px;","--tbUpButton: var(--imgUpButton);","--tbVButton: var(--imgVButton);","--tbDownButton: var(--imgDownButton);","--tbLeftButton: var(--imgLeftButton);","--tbHButton: var(--imgHButton);","--tbRightButton: var(--imgRightButton);","--tbCorner: var(--imgCorner);","}","#tbFog","{","top: 0px;","left: 0px;","height: 100%;","width: 100%;","margin: 0px;","padding: 0px;","position: absolute;","background-color: #000000;","opacity: 0.5;","display: none;","}",":host([disabled]) #tbFog","{","display: inherit;","}","#tbAction","{","top: 0px;","left: 0px;","min-height: 1px;","min-width: 1px;","margin: 0px;","position: absolute;","border: none;","overflow: scroll;","overflow-x: scroll;","overflow-y: scroll;","display: inherit;","flex-direction: inherit;","flex-wrap: inherit;","flex-flow: inherit;","justify-content: inherit;","align-items: inherit;","align-content: inherit;","}","tb-vscrollbar","{","top: 0px;","right: 0px;","width: var(--tbScrollBar_width);","margin: 0px;","position: absolute;","--tbUpButton: inherit;","--tbVButton: inherit;","--tbDownButton: inherit;","}","tb-hscrollbar","{","bottom: 0px;","left: 0px;","height: var(--tbScrollBar_height);","margin: 0px;","position: absolute;","--tbLeftButton: inherit;","--tbHButton: inherit;","--tbRightButton: inherit;","}","#tbCorner","{","right: 0px;","bottom: 0px;","height: var(--tbScrollBar_height);","width: var(--tbScrollBar_width);","margin: 0px;","padding: 0px;","position: absolute;","background-image: var(--tbCorner);","background-repeat: no-repeat;","background-size: contain;","}","</style>","<div id = 'tbAction'><slot id = 'aSlot' name = 'aSlot'></slot></div>","<div id = 'tbCorner'></div>","<div id = 'tbFog'></div>","");var f,b=p.getElementById("tbAction");b.addEventListener("wheel",function(e){if(n&&0!=e.deltaY){var t=0;0==e.deltaMode?t=e.deltaY:1==e.deltaMode&&(t=100*e.deltaY),n.ScrollValue+=t}if(o&&0!=e.deltaX){t=0;0==e.deltaMode?t=e.deltaX:1==e.deltaMode&&(t=100*e.deltaX),o.ScrollValue+=t}return e.stopPropagation(),!1},!1),new ResizeObserver(function(e){var t=e[e.length-1],d=r,u=s;n&&(d+=n.ScrollMax,u-=a),o&&(d-=l,u+=o.ScrollMax),t.contentRect.height==d&&t.contentRect.width==u||window.requestAnimationFrame(function(){i.Loaded=!1,v(),i.Loaded=!0})}).observe(b),(f=p.getElementById("tbCorner")).addEventListener("mouseenter",function(e){f.hasAttribute("hover")||f.setAttribute("hover","")},!1),f.addEventListener("mouseleave",function(e){f.hasAttribute("hover")&&f.removeAttribute("hover")},!1),Object.defineProperties(i,{tbScrollTop:{get:function(){return n?n.ScrollValue:0},set:function(e){n&&(n.ScrollValue=e<0?0:e)}}}),Object.defineProperties(i,{tbScrollLeft:{get:function(){return o?o.ScrollValue:0},set:function(e){o&&(o.ScrollValue=e<0?0:e)}}}),Object.defineProperties(i,{tbScrollHeight:{get:function(){return b.scrollHeight}}}),Object.defineProperties(i,{disabled:{get:function(){return i.hasAttribute("disabled")},set:function(e){e?i.setAttribute("disabled",""):i.removeAttribute("disabled")}}}),Object.defineProperties(i,{autoRefresh:{get:function(){return h},set:function(e){e?(h=!0,i.refresh()):h=!1}}}),Object.defineProperties(i,{staticParent:{get:function(){return c},set:function(e){c=Boolean(e)}}}),i.refresh=function(){if(i.Loaded&&h){i.Loaded=!1,r=i.clientHeight,s=i.clientWidth,l=f.clientHeight,a=f.clientWidth;var e=$TB.Css.get(i,"--tbOverflow"),t=$TB.Css.get(i,"--tbOverflowY"),o=$TB.Css.get(i,"--tbOverflowX");("visible"==e||"hidden"==e||"auto"==e||(e="scroll"))&&(d=e,u=e),"visible"!=t&&"hidden"!=t&&"auto"!=t&&"scroll"!=t||(d=t),"visible"!=o&&"hidden"!=o&&"auto"!=o&&"scroll"!=o||(u=o),v(),i.Loaded=!0}};var v=function(){for(var c=!1,h=!1,p=0,v=0,x=0;x<i.childNodes.length;x++)if("absolute"==window.getComputedStyle(i.childNodes[x],null).getPropertyValue("position")){var L=i.childNodes[x].offsetTop+i.childNodes[x].offsetHeight,T=i.childNodes[x].offsetLeft+i.childNodes[x].offsetWidth;L>p&&(p=L),T>v&&(v=T)}"visible"==u&&i.style.removeProperty("height"),"visible"==d&&i.style.removeProperty("width"),b.style.minHeight=r+"px",b.style.minWidth="0px",b.style.width="0px",t=b.scrollWidth,b.style.removeProperty("width"),b.style.minWidth=s+0+"px",b.style.minHeight="0px",b.style.height="0px",e=b.scrollHeight,b.style.removeProperty("height"),e>r&&"hidden"!=d&&(c=!0,b.style.minWidth=s-a+$TB.ScrollBarWidth+"px",b.style.minHeight="0px",b.style.height="0px",e=b.scrollHeight,b.style.removeProperty("height"),t+a>s&&"hidden"!=u&&(h=!0)),t>s&&"hidden"!=u&&(h=!0,b.style.minHeight=r-l+$TB.ScrollBarWidth+"px",b.style.minWidth="0px",b.style.width="0px",t=b.scrollWidth,b.style.removeProperty("width"),e+l>r&&"hidden"!=d&&(c=!0)),"scroll"==d||"auto"==d&&c?m():y(),"scroll"==u||"auto"==u&&h?g():B(),f.style.visibility=n&&o?"inherit":"hidden",n&&(n.disabled=!c),o&&(o.disabled=!h),o&&n?(o.style.width=s-a+"px",o.ScrollSmall=$TB.ScrollBarWidth,o.ScrollLarge=3*$TB.ScrollBarWidth,o.ScrollMax=t+l-s,o.ScrollValue=o.ScrollValue,n.style.height=r-l+"px",n.ScrollSmall=$TB.ScrollBarWidth,n.ScrollLarge=3*$TB.ScrollBarWidth,n.ScrollMax=e+l-r,n.ScrollValue=n.ScrollValue):o?(b.style.top="0px",b.style.minHeight=r-l+$TB.ScrollBarWidth+"px",b.style.minWidth=v>0?v+$TB.ScrollBarWidth+"px":s+$TB.ScrollBarWidth+"px",o.style.width=s+"px",o.ScrollSmall=$TB.ScrollBarWidth,o.ScrollLarge=3*$TB.ScrollBarWidth,o.ScrollMax=Math.max(0,t-s),o.ScrollValue=o.ScrollValue):n?(b.style.left="0px",b.style.minWidth=s-a+$TB.ScrollBarWidth+"px",b.style.minHeight=p>0?p+$TB.ScrollBarWidth+"px":r+$TB.ScrollBarWidth+"px",n.style.height=r+"px",n.ScrollSmall=$TB.ScrollBarWidth,n.ScrollLarge=3*$TB.ScrollBarWidth,n.ScrollMax=Math.max(0,e-r),n.ScrollValue=n.ScrollValue):(b.style.top="0px",b.style.left="0px","visible"==u&&h&&"visible"==d&&c?(i.style.height=e+"px",i.style.width=t+"px"):"visible"==u&&h?(i.style.width=t+"px",b.style.minHeight=r+$TB.ScrollBarWidth+"px"):"visible"==d&&c?(i.style.height=e+"px",b.style.minWidth=s+$TB.ScrollBarWidth+"px"):(b.style.minHeight=r+$TB.ScrollBarWidth+"px",b.style.minWidth=s+$TB.ScrollBarWidth+"px")),i.resize()};i.appendChild=function(e){e.slot="aSlot",i._appendChild(e)},i.insertBefore=function(e,t){e.slot="aSlot",i._insertBefore(e,t)},i.select=function(){i.focus()},i.Clear=function(){i.shadowRoot.getElementById("aSlot").innerHTML=""};var g=function(){o||((o=document.createElement("tb-hscrollbar")).staticParent=!0,o.onscroll=function(e){b.style.left=-1*o.ScrollValue+"px"},p.appendChild(o))},B=function(){o&&(p.removeChild(o),o=null)},m=function(){n||((n=document.createElement("tb-vscrollbar")).staticParent=!0,n.onscroll=function(e){b.style.top=-1*n.ScrollValue+"px"},p.appendChild(n))},y=function(){n&&(p.removeChild(n),n=null)};document.addEventListener("CssRefresh",function(){i.refresh()},!1),i.Loaded=!0}connectedCallback(){if(this.childNodes.length>this.shadowRoot.getElementById("aSlot").childNodes.length)for(let e=0;e<this.childNodes.length;e++)this.appendChild(this.childNodes[0]);this.refresh()}static get observedAttributes(){return["style","class"]}attributeChangedCallback(e,t,o){this.Loaded&&this.refresh()}set ontbScroll(e){"function"==typeof e&&this.addEventListener("tbScroll",function(t){e()},!1)}set onresize(e){"function"==typeof e&&this.addEventListener("resize",function(t){e()},!1)}}customElements.define("tb-div",TB_Div);class TB_HScrollBar extends HTMLElement{constructor(){super();var e,t,o,n=this,i=10,r=30,s=5,l=1,a=0,d=100,u=0,c=.05,h=!1;n.Loaded=!1,n.scroll=function(e){var t=new CustomEvent("scroll",{detail:{},bubbles:!1,cancelable:!1});n.dispatchEvent(t)},n.addEventListener("focus",function(e){n.hasAttribute("focus")||n.setAttribute("focus","")},!1),n.addEventListener("wheel",function(e){var t=0;return 0==e.deltaMode?t=e.deltaX:1==e.deltaMode&&(t=100*e.deltaX),n.ScrollValue=u+t,e.stopPropagation(),!1},!1),n.addEventListener("mouseenter",function(e){n.hasAttribute("hover")||n.setAttribute("hover","")},!1),n.addEventListener("mouseleave",function(e){n.hasAttribute("hover")&&n.removeAttribute("hover")},!1),n.addEventListener("focusout",function(e){n.hasAttribute("focus")&&n.removeAttribute("focus")},!1);var p=this.attachShadow({mode:"open",delegatesFocus:!0});p.innerHTML="".concat("<style>",":host","{","height: 20px;","width: 100px;","margin: 0px;","padding: 0px;","position: absolute;","background-color: #1233FF;","overflow: hidden;","cursor: pointer;","outline: none;","--tbLeftButton: var(--imgLeftButton);","--tbHButton: var(--imgHButton);","--tbRightButton: var(--imgRightButton);","}",":host([disabled])","{","pointer-events: none;","cursor: inherit;","}","#tbFog","{","top: 0px;","left: 0px;","height: 100%;","width: 100%;","margin: 0px;","padding: 0px;","position: absolute;","background-color: #000000;","opacity: 0.5;","display: none;","}",":host([disabled]) #tbFog","{","display: inherit;","}","div","{","top: 0px;","height: 100%;","margin: 0px;","padding: 0px;","position: absolute;","}",".Image","{","background-repeat: no-repeat;","background-size: contain;","}","#tbLeftButton","{","left: 0px;","background-image: var(--tbLeftButton);","}","#tbScrollBar","{","background-image: var(--tbHButton);","}",":host([disabled]) #tbScrollBar ","{","display: none;","}","#tbRightButton","{","background-image: var(--tbRightButton);","}","</style>","<div id = 'tbLeftButton' class = 'Image'></div>","<div id = 'tbLeftBar'></div>","<div id = 'tbRightBar'></div>","<div id = 'tbRightButton' class = 'Image'></div>","<div id = 'tbScrollBar' class = 'Image'></div>","<div id = 'tbFog'></div>","");var f=p.getElementById("tbLeftButton");f.addEventListener("click",function(e){n.ScrollValue=u-l},!1),f.addEventListener("mousedown",function(t){return e=setInterval(function(){n.ScrollValue=u-l},100),!1},!1),f.addEventListener("mouseout",function(t){clearInterval(e)},!1),f.addEventListener("mouseup",function(t){clearInterval(e)},!1);var b=p.getElementById("tbLeftBar");b.addEventListener("click",function(e){n.ScrollValue=u-s},!1),b.addEventListener("mousedown",function(t){return e=setInterval(function(){n.ScrollValue=u-s},100),!1},!1),b.addEventListener("mouseout",function(t){clearInterval(e)},!1),b.addEventListener("mouseup",function(t){clearInterval(e)},!1);var v=p.getElementById("tbScrollBar");v.addEventListener("mousedown",function(e){return t=setInterval(function(){var e,o=n.getBoundingClientRect();$TB.Mouse.Left&&$TB.Mouse.Y>o.top-4*i&&$TB.Mouse.Y<o.top+5*i?(e=$TB.Mouse.X>o.left+r-2*i?r-2*i:$TB.Mouse.X-o.left-i,n.ScrollValue=parseInt(e/c)):clearInterval(t)},100),!1},!1),v.addEventListener("mouseup",function(e){clearInterval(t)},!1);var g=p.getElementById("tbRightBar");g.addEventListener("click",function(e){n.ScrollValue=u+s},!1),g.addEventListener("mousedown",function(t){return e=setInterval(function(){n.ScrollValue=u+s},100),!1},!1),g.addEventListener("mouseout",function(t){clearInterval(e)},!1),g.addEventListener("mouseup",function(t){clearInterval(e)},!1);var B=p.getElementById("tbRightButton");B.addEventListener("click",function(e){n.ScrollValue=u+l},!1),B.addEventListener("mousedown",function(t){return e=setInterval(function(){n.ScrollValue=u+l},100),!1},!1),B.addEventListener("mouseout",function(t){clearInterval(e)},!1),B.addEventListener("mouseup",function(t){clearInterval(e)},!1),Object.defineProperties(n,{ScrollMin:{get:function(){return a},set:function(e){c=(r-3*i)/(d-(a=e)),u<a&&(u=a),y()}}}),Object.defineProperties(n,{ScrollMax:{get:function(){return d},set:function(e){c=(r-3*i)/((d=e)-a),u>d&&(u=d),y()}}}),Object.defineProperties(n,{ScrollValue:{get:function(){return u},set:function(e){u!=(u=e<a?a:e>d?d:e)&&y()}}}),Object.defineProperties(n,{ScrollSmall:{get:function(){return l},set:function(e){l=e}}}),Object.defineProperties(n,{ScrollLarge:{get:function(){return s},set:function(e){s=e}}}),Object.defineProperties(n,{ScrollRatio:{get:function(){return c},set:function(e){c=e}}}),Object.defineProperties(n,{staticParent:{get:function(){return h},set:function(e){h=Boolean(e)}}}),Object.defineProperties(n,{disabled:{get:function(){return n.hasAttribute("disabled")},set:function(e){e?n.setAttribute("disabled",""):n.removeAttribute("disabled")}}}),n.refresh=function(){n.Loaded&&(n.Loaded=!1,f.offsetParent?m():(o||(o=new ResizeObserver(function(e){o.disconnect(),m()})),o.observe(f)),n.Loaded=!0)};var m=function(){i=n.clientHeight,r=n.clientWidth,n.style.padding="0px",n.style.overflow="hidden";var e=(c=(r-3*i)/(d-a))*(u-a);f.style.width=i+"px",b.style.left=i+"px",b.style.width=parseInt(e+i/2)+"px",v.style.left=parseInt(e+i)+"px",v.style.width=i+"px",g.style.left=e+2*i+"px",g.style.width=r-e+"px",B.style.left=r-i+"px",B.style.width=i+"px",v.style.visibility=r-2*i<=0?"hidden":"inherit"},y=function(){var e=c*(u-a);b.style.width=parseInt(e+i/2)+"px",v.style.left=parseInt(e+i)+"px",g.style.left=e+2*i+"px",g.style.width=r-e+"px",n.scroll()};document.addEventListener("CssRefresh",function(){n.refresh()},!1),n.Loaded=!0}connectedCallback(){this.refresh()}static get observedAttributes(){return["style","class"]}attributeChangedCallback(e,t,o){this.Loaded&&this.refresh()}set onscroll(e){"function"==typeof e&&this.addEventListener("scroll",function(t){e()},!1)}}customElements.define("tb-hscrollbar",TB_HScrollBar);class TB_VScrollBar extends HTMLElement{constructor(){super();var e,t,o,n=this,i=30,r=10,s=5,l=1,a=0,d=100,u=0,c=.05,h=!1;n.Loaded=!1,n.scroll=function(e){var t=new CustomEvent("scroll",{detail:{},bubbles:!1,cancelable:!1});n.dispatchEvent(t)},n.addEventListener("focus",function(e){n.hasAttribute("focus")||n.setAttribute("focus","")},!1),n.addEventListener("wheel",function(e){var t=0;return 0==e.deltaMode?t=e.deltaY:1==e.deltaMode&&(t=100*e.deltaY),n.ScrollValue=u+t,e.stopPropagation(),!1},!1),n.addEventListener("mouseenter",function(e){n.hasAttribute("hover")||n.setAttribute("hover","")},!1),n.addEventListener("mouseleave",function(e){n.hasAttribute("hover")&&n.removeAttribute("hover")},!1),n.addEventListener("focusout",function(e){n.hasAttribute("focus")&&n.removeAttribute("focus")},!1);var p=this.attachShadow({mode:"open",delegatesFocus:!0});p.innerHTML="".concat("<style>",":host","{","margin: 0px;","padding: 0px;","position: absolute;","background-color: #1233FF;","overflow: hidden;","cursor: pointer;","outline: none;","--tbUpButton: var(--imgUpButton);","--tbVButton: var(--imgVButton);","--tbDownButton: var(--imgDownButton);","}",":host([disabled])","{","pointer-events: none;","cursor: inherit;","}","#tbFog","{","left: 0px;","height: 100%;","width: 100%;","display: none;","background-color: #000000;","opacity: 0.5;","}",":host([disabled]) #tbFog","{","display: inherit;","}","div","{","left: 0px;","width: 100%;","margin: 0px;","padding: 0px;","position: absolute;","}",".Image","{","background-repeat: no-repeat;","background-size: contain;","}","#tbUpButton","{","top: 0px;","background-image: var(--tbUpButton);","}","#tbScrollBar","{","background-image: var(--tbVButton);","}",":host([disabled]) #tbScrollBar","{","display: none;","}","#tbDownButton","{","background-image: var(--tbDownButton);","}","</style>","<div id = 'tbUpButton' class = 'Image'></div>","<div id = 'tbUpBar'></div>","<div id = 'tbDownBar'></div>","<div id = 'tbDownButton' class = 'Image'></div>","<div id = 'tbScrollBar' class = 'Image'></div>","<div id = 'tbFog'></div>","");var f=p.getElementById("tbUpButton");f.addEventListener("click",function(e){n.ScrollValue=u-l},!1),f.addEventListener("mousedown",function(t){return e=setInterval(function(){$TB.Mouse.Left?n.ScrollValue=u-l:clearInterval(e)},100),!1},!1),f.addEventListener("mouseout",function(t){clearInterval(e)},!1),f.addEventListener("mouseup",function(t){clearInterval(e)},!1);var b=p.getElementById("tbUpBar");b.addEventListener("click",function(e){n.ScrollValue=u-s},!1),b.addEventListener("mousedown",function(t){return e=setInterval(function(){$TB.Mouse.Left?n.ScrollValue=u-s:clearInterval(e)},100),!1},!1),b.addEventListener("mouseout",function(t){clearInterval(e)},!1),b.addEventListener("mouseup",function(t){clearInterval(e)},!1);var v=p.getElementById("tbScrollBar");v.addEventListener("mousedown",function(e){return t=setInterval(function(){var e,o=n.getBoundingClientRect();$TB.Mouse.Left&&$TB.Mouse.X>o.left-4*r&&$TB.Mouse.X<o.left+5*r?(e=$TB.Mouse.Y>o.top+i-2*r?i-2*r:$TB.Mouse.Y-o.top-r,n.ScrollValue=parseInt(e/c)):clearInterval(t)},100),!1},!1),v.addEventListener("mouseup",function(e){clearInterval(t)},!1);var g=p.getElementById("tbDownBar");g.addEventListener("click",function(e){n.ScrollValue=u+s},!1),g.addEventListener("mousedown",function(t){return e=setInterval(function(){$TB.Mouse.Left?n.ScrollValue=u+s:clearInterval(e)},100),!1},!1),g.addEventListener("mouseout",function(t){clearInterval(e)},!1),g.addEventListener("mouseup",function(t){clearInterval(e)},!1);var B=p.getElementById("tbDownButton");B.addEventListener("click",function(e){n.ScrollValue=u+l},!1),B.addEventListener("mousedown",function(t){return e=setInterval(function(){$TB.Mouse.Left?n.ScrollValue=u+l:clearInterval(e)},100),!1},!1),B.addEventListener("mouseout",function(t){clearInterval(e)},!1),B.addEventListener("mouseup",function(t){clearInterval(e)},!1),Object.defineProperties(n,{ScrollMin:{get:function(){return a},set:function(e){c=(i-3*r)/(d-(a=e)),u<a&&(u=a),y()}}}),Object.defineProperties(n,{ScrollMax:{get:function(){return d},set:function(e){c=(i-3*r)/((d=e)-a),u>d&&(u=d),y()}}}),Object.defineProperties(n,{ScrollValue:{get:function(){return u},set:function(e){u!=(u=e<a?a:e>d?d:e)&&y()}}}),Object.defineProperties(n,{ScrollSmall:{get:function(){return l},set:function(e){l=e}}}),Object.defineProperties(n,{ScrollLarge:{get:function(){return s},set:function(e){s=e}}}),Object.defineProperties(n,{ScrollRatio:{get:function(){return c},set:function(e){c=e}}}),Object.defineProperties(n,{staticParent:{get:function(){return h},set:function(e){h=Boolean(e)}}}),Object.defineProperties(n,{disabled:{get:function(){return n.hasAttribute("disabled")},set:function(e){e?n.setAttribute("disabled",""):n.removeAttribute("disabled")}}}),n.refresh=function(){n.Loaded&&(n.Loaded=!1,f.offsetParent?m():(o||(o=new ResizeObserver(function(e){o.disconnect(),m()})),o.observe(f)),n.Loaded=!0)};var m=function(){i=n.clientHeight,r=n.clientWidth;var e=(c=(i-3*r)/(d-a))*(u-a);f.style.height=r+"px",b.style.top=r+"px",b.style.height=parseInt(e+r/2)+"px",v.style.top=parseInt(e+r)+"px",v.style.height=r+"px",g.style.top=e+2*r+"px",g.style.height=i-e+"px",B.style.top=i-r+"px",B.style.height=r+"px",v.style.visibility=i-2*r<=0?"hidden":"inherit"},y=function(){var e=c*(u-a);b.style.height=parseInt(e+r/2)+"px",v.style.top=parseInt(e+r)+"px",g.style.top=e+2*r+"px",g.style.height=i-e+"px",n.scroll()};document.addEventListener("CssRefresh",function(){n.refresh()},!1),n.Loaded=!0}connectedCallback(){this.refresh()}static get observedAttributes(){return["style","class"]}attributeChangedCallback(e,t,o){this.Loaded&&this.refresh()}set onscroll(e){"function"==typeof e&&this.addEventListener("scroll",function(t){e()},!1)}}customElements.define("tb-vscrollbar",TB_VScrollBar);