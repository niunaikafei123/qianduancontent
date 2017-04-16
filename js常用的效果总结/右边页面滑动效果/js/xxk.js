// JavaScript Document
function set(name,cursel,n){
	  for(i=1;i<=n;i++){
	  var menu=document.getElementById(name+i);
	  var show=document.getElementById(name+"_"+i);
	  menu.className=i==cursel?"hover":"";
	  show.style.display=i==cursel?"inline":"none";
	} 
  }