(()=>{"use strict";var e,t={534:(e,t,a)=>{var l=a(609),n=a(997),r=a(715),o=a(427);window.wp.data;var s=a(723);const d=window.wp.apiFetch;var c=a.n(d),i=a(87);const p=JSON.parse('{"apiVersion":2,"name":"wondah-blocks/dynamic-content","title":"Dynamic Content","category":"wondah-blocks","icon":"grid-view","description":"Display posts or custom post types in a grid layout","supports":{"html":false,"align":["wide","full"]},"textdomain":"wondah-blocks","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","attributes":{"layout":{"type":"string","default":"grid"},"postType":{"type":"string","default":"post"},"postsPerPage":{"type":"number","default":6},"columns":{"type":"number","default":3},"orderBy":{"type":"string","default":"date"},"order":{"type":"string","default":"desc"},"displayFeaturedImage":{"type":"boolean","default":true},"displayExcerpt":{"type":"boolean","default":true},"displayDate":{"type":"boolean","default":true},"parentPage":{"type":"string","default":"0"}}}');(0,n.registerBlockType)(p.name,{...p,edit:({attributes:e,setAttributes:t})=>{const[a,n]=(0,i.useState)([]),[d,p]=(0,i.useState)([]),{postType:m,postsPerPage:u,columns:g,orderBy:b,order:y,displayFeaturedImage:h,displayExcerpt:v,displayDate:w,layout:f,parentPage:_}=e,[E,k]=(0,i.useState)([]);return(0,i.useEffect)((()=>{c()({path:"/wp/v2/types"}).then((e=>{const t=Object.keys(e).map((t=>({label:e[t].name,value:t})));n(t)}))}),[]),(0,i.useEffect)((()=>{"page"===m&&c()({path:"/wp/v2/pages?per_page=100"}).then((e=>{const t=e.filter((e=>0===e.parent)).map((e=>({label:e.title.rendered,value:e.id.toString()})));k([{label:"All Pages",value:"0"},...t])}))}),[m]),(0,i.useEffect)((()=>{const t=m||"post";let a=`/wp/v2/${t}`;a+="s";const l=new URLSearchParams({per_page:u?.toString()||"6",orderby:b||"date",order:(y||"desc").toLowerCase(),_embed:"true"});"page"===t&&e.parentPage&&"0"!==e.parentPage&&l.append("parent",e.parentPage),a+=`?${l.toString()}`,c()({path:a}).then((e=>{p(e)})).catch((e=>{console.error("Error fetching posts:",e),p([])}))}),[m,u,b,y,e.parentPage]),(0,l.createElement)(l.Fragment,null,(0,l.createElement)(r.InspectorControls,null,(0,l.createElement)(o.PanelBody,{title:(0,s.__)("Content Settings","wondah-blocks")},(0,l.createElement)(o.SelectControl,{label:(0,s.__)("Post Type","wondah-blocks"),value:m,options:[{label:"Posts",value:"post"},{label:"Pages",value:"page"},...a.filter((e=>!["post","page"].includes(e.value)))],onChange:e=>t({postType:e})}),"page"===m&&(0,l.createElement)(o.SelectControl,{label:(0,s.__)("Parent Page","wondah-blocks"),value:e.parentPage,options:E,onChange:e=>t({parentPage:e})}),(0,l.createElement)(o.RangeControl,{label:(0,s.__)("Posts per Page","wondah-blocks"),value:u,onChange:e=>t({postsPerPage:e}),min:1,max:12}),(0,l.createElement)(o.RangeControl,{label:(0,s.__)("Columns","wondah-blocks"),value:g,onChange:e=>t({columns:e}),min:1,max:4}),(0,l.createElement)(o.SelectControl,{label:(0,s.__)("Order By","wondah-blocks"),value:b,options:[{label:"Date",value:"date"},{label:"Title",value:"title"},{label:"Menu Order",value:"menu_order"}],onChange:e=>t({orderBy:e})}),(0,l.createElement)(o.SelectControl,{label:(0,s.__)("Order","wondah-blocks"),value:y,options:[{label:"Descending",value:"desc"},{label:"Ascending",value:"asc"}],onChange:e=>t({order:e})}),(0,l.createElement)(o.SelectControl,{label:(0,s.__)("Layout Style","wondah-blocks"),value:f,options:[{label:"Grid Layout",value:"grid"},{label:"Modern Layout",value:"modern"}],onChange:e=>t({layout:e})}),(0,l.createElement)(o.ToggleControl,{label:(0,s.__)("Display Featured Image","wondah-blocks"),checked:h,onChange:()=>t({displayFeaturedImage:!h})}),(0,l.createElement)(o.ToggleControl,{label:(0,s.__)("Display Excerpt","wondah-blocks"),checked:v,onChange:()=>t({displayExcerpt:!v})}),(0,l.createElement)(o.ToggleControl,{label:(0,s.__)("Display Date","wondah-blocks"),checked:w,onChange:()=>t({displayDate:!w})}))),(0,l.createElement)("div",{...(0,r.useBlockProps)()},"grid"===f?(0,l.createElement)("div",{className:`dynamic-content-grid columns-${g}`},d.map((e=>(0,l.createElement)("div",{key:e.id,className:"dynamic-content-item"},h&&e._embedded?.["wp:featuredmedia"]&&(0,l.createElement)("div",{className:"featured-image"},(0,l.createElement)("img",{src:e._embedded["wp:featuredmedia"][0].source_url,alt:e.title.rendered})),(0,l.createElement)("div",{className:"content"},(0,l.createElement)("h3",{dangerouslySetInnerHTML:{__html:e.title.rendered}}),w&&(0,l.createElement)("div",{className:"date"},new Date(e.date).toLocaleDateString()),v&&(0,l.createElement)("div",{className:"excerpt",dangerouslySetInnerHTML:{__html:e.excerpt.rendered}})))))):(0,l.createElement)("div",{className:"dynamic-content-modern"},d.map((e=>(0,l.createElement)("div",{key:e.id,className:"dynamic-content-item"},(0,l.createElement)("div",{className:"content"},(0,l.createElement)("h3",{dangerouslySetInnerHTML:{__html:e.title.rendered}}),v&&(0,l.createElement)("div",{className:"excerpt",dangerouslySetInnerHTML:{__html:e.excerpt.rendered}}),(0,l.createElement)("a",{href:e.link,className:"read-more"},(0,s.__)("Read More","wondah-blocks"))),h&&e._embedded?.["wp:featuredmedia"]&&(0,l.createElement)("div",{className:"featured-image"},(0,l.createElement)("img",{src:e._embedded["wp:featuredmedia"][0].source_url,alt:e.title.rendered}))))))))},save:({attributes:e})=>null})},609:e=>{e.exports=window.React},715:e=>{e.exports=window.wp.blockEditor},997:e=>{e.exports=window.wp.blocks},427:e=>{e.exports=window.wp.components},87:e=>{e.exports=window.wp.element},723:e=>{e.exports=window.wp.i18n}},a={};function l(e){var n=a[e];if(void 0!==n)return n.exports;var r=a[e]={exports:{}};return t[e](r,r.exports,l),r.exports}l.m=t,e=[],l.O=(t,a,n,r)=>{if(!a){var o=1/0;for(i=0;i<e.length;i++){for(var[a,n,r]=e[i],s=!0,d=0;d<a.length;d++)(!1&r||o>=r)&&Object.keys(l.O).every((e=>l.O[e](a[d])))?a.splice(d--,1):(s=!1,r<o&&(o=r));if(s){e.splice(i--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var i=e.length;i>0&&e[i-1][2]>r;i--)e[i]=e[i-1];e[i]=[a,n,r]},l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var a in t)l.o(t,a)&&!l.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={222:0,885:0};l.O.j=t=>0===e[t];var t=(t,a)=>{var n,r,[o,s,d]=a,c=0;if(o.some((t=>0!==e[t]))){for(n in s)l.o(s,n)&&(l.m[n]=s[n]);if(d)var i=d(l)}for(t&&t(a);c<o.length;c++)r=o[c],l.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return l.O(i)},a=globalThis.webpackChunkwondah_blocks=globalThis.webpackChunkwondah_blocks||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var n=l.O(void 0,[885],(()=>l(534)));n=l.O(n)})();