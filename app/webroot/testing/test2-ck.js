$(document).ready(function(){function c(a){a.attr("opacity",.5)}function d(a){a.transition().duration(200).attr("opacity",1)}function e(a){c(a);o()}function f(a){d(a);n()}function j(){b=d3.select("#canvas").append("svg");k();l();m();n()}function k(){var c=b.selectAll("g.place").data(a.places).enter().append("g").attr("class",function(a){return"place place"+a.id}).attr("opacity",1).attr("data-id",function(a){return a.id}).attr("data-parent",function(a){return a.parent?a.parent:null}).attr("transform",function(a){return"translate("+a.x+","+a.y+")"}).call(g);c.append("rect").attr("width",function(a){return a.width}).attr("height",function(a){return a.height});c.append("text").attr("text-anchor","middle").attr("x",function(a){return a.width/2}).attr("dy","1.6em").text(function(a){return a.name});c.append("circle").attr("r",7).attr("cx",function(a){return a.width}).attr("cy",function(a){return a.height}).attr("group",function(a){return"place"+a.id}).call(h);$(".place").each(function(){var a=$(this).data();if(a.parent&&$(".place"+a.parent).length>0){var b=$(".place"+a.parent);b.append($(this))}})}function l(){var c=100,d=30,e=b.selectAll("g.entitiy").data(a.entities).enter().append("g").attr("class",function(a){return"entity entity"+a.id+" "+a.type}).attr("opacity",1).attr("data-id",function(a){return a.id}).attr("data-location",function(a){return a.location}).attr("transform",function(a){return"translate("+a.x+","+a.y+")"}).call(i);e.append("rect").attr("width",c).attr("height",d);e.append("text").attr("text-anchor","middle").attr("x",c/2).attr("dy","1.6em").text(function(a){return a.name});$(".entity").each(function(){var a=$(this).data();if($(".place"+a.location).length>0){var b=$(".place"+a.location);b.append($(this))}})}function m(){b.append("defs").selectAll("marker").data(["increases","decreases","does-not-change"]).enter().append("marker").attr("id",String).attr("viewBox","0 -5 10 10").attr("refX",0).attr("refY",0).attr("markerWidth",4).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M0,-5L10,0L0,5")}function n(){for(var c in a.links){var d=a.links[c],e=d.start.id,f=d.end.id,g=p(e),h=p(f),i='.entity[data-id="'+e+'"]',j='.entity[data-id="'+f+'"]',k=$(i),l=$(j),m=d3.select(i+" rect"),n=d3.select(j+" rect"),o=k.offset().left,q=k.offset().top,r=l.offset().left,s=l.offset().top,t=parseInt(m.attr("height")),u=parseInt(m.attr("width")),v=parseInt(n.attr("height")),w=parseInt(n.attr("width")),x=d3.svg.diagonal().source(function(a,b){return a.start.pos}).target(function(a,b){return a.end.pos}),y=Math.abs(q-s)-v,z=Math.abs(o-r)-w;y<0&&(y=0);z<0&&(z=0);if(y<50)if(g.x<=h.x){g.x=o+u;h.x=r}else{g.x=o;h.x=r+w}else if(g.y<=h.y){g.y=q+t;h.y=s}else{g.y=q;h.y=s+v}a.links[c].start.pos=g;a.links[c].end.pos=h}var d=b.selectAll("line.link").data(a.links).enter().append("line").attr("class",function(a){return"link "+a.type}).attr("data-start",function(a){return a.start.id}).attr("data-start",function(a){return a.start.id}).attr("data-end",function(a){return a.end.id}).attr("data-type",function(a){return a.type}).attr("x1",function(a){return a.start.pos.x}).attr("x2",function(a){return a.end.pos.x}).attr("y1",function(a){return a.start.pos.y}).attr("y2",function(a){return a.end.pos.y}).attr("marker-end",function(a){return"url(#"+a.type+")"})}function o(){d3.selectAll("line.link").remove()}function p(a){var b='.entity[data-id="'+a+'"]',c=d3.select(b),d=d3.select(b+" rect"),e=c.datum(),f=$(b).offset().left,g=$(b).offset().top,h=parseInt(d.attr("width")),i=parseInt(d.attr("height")),j=f+h/2-7,k=g+i/2;return{x:j,y:k}}var a={places:[{id:1,name:"cell",x:20,y:30,width:500,height:400},{id:2,name:"lysosome",parent:1,x:40,y:50,width:200,height:250},{id:3,name:"cytoplasm",parent:1,x:269,y:52,width:200,height:250},{id:4,name:"nucleus",parent:3,x:23,y:83,width:150,height:150}],entities:[{id:1,name:"mitochondria",type:"transient",x:20,y:93,location:4},{id:2,name:"ribosome",type:"stable",x:45,y:111,location:2},{id:3,name:"ROS",type:"transient",x:41,y:39,location:3}],links:[{id:1,start:{id:1,pos:{}},end:{id:2,pos:{}},type:"increases"},{id:2,start:{id:2,pos:{}},end:{id:3,pos:{}},type:"decreases"}]},b=null,g=d3.behavior.drag().on("dragstart",function(){d3.select(this).call(e)}).on("drag",function(a,b){a.x+=d3.event.dx;a.y+=d3.event.dy;d3.select(this).attr("transform","translate("+a.x+","+a.y+")")}).on("dragend",function(){d3.select(this).call(f)}),h=d3.behavior.drag().on("dragstart",function(){}).on("drag",function(a,b){var c=d3.select(this),d=c.attr("group"),e=d3.select("."+d+" rect"),f=d3.select("."+d+" text"),g=parseInt(e.attr("width"))+d3.event.dx,h=parseInt(e.attr("height"))+d3.event.dy,i=parseInt(c.attr("cx"))+d3.event.dx,j=parseInt(c.attr("cy"))+d3.event.dy,k=parseInt(c.attr("r"));c.attr("cx",i).attr("cy",j);e.attr("height",h).attr("width",g);f.attr("x",g/2)}),i=d3.behavior.drag().on("dragstart",function(){o()}).on("drag",function(a,b){a.x+=d3.event.dx;a.y+=d3.event.dy;d3.select(this).attr("transform","translate("+a.x+","+a.y+")")}).on("dragend",function(){n()});j()});