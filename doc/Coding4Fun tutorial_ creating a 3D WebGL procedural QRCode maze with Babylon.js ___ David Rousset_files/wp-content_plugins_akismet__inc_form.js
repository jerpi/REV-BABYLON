var mod_pagespeed_SnhpyQUK4X = "var ak_js=document.getElementById(\"ak_js\");if(!ak_js){ak_js=document.createElement('input');ak_js.setAttribute('id','ak_js');ak_js.setAttribute('name','ak_js');ak_js.setAttribute('type','hidden');}else{ak_js.parentNode.removeChild(ak_js);}ak_js.setAttribute('value',(new Date()).getTime());var commentForm=document.getElementById('commentform');if(commentForm){commentForm.appendChild(ak_js);}else{var replyRowContainer=document.getElementById('replyrow');if(replyRowContainer){var children=replyRowContainer.getElementsByTagName('td');if(children.length>0){children[0].appendChild(ak_js);}}}";
var mod_pagespeed_lY9NMJv1uT = "!function(n,e){function t(e,t){this.element=e,this.settings=n.extend({},a,t),this._defaults=a,this._name=i,this.init()}var a={label:\"MENU\",duplicate:!0,duration:200,easingOpen:\"swing\",easingClose:\"swing\",closedSymbol:\"&#9658;\",openedSymbol:\"&#9660;\",prependTo:\"body\",parentTag:\"a\",closeOnClick:!1,allowParentLinks:!1,nestedParentLinks:!0,showChildren:!1,brand:\"\",init:function(){},open:function(){},close:function(){}},i=\"slicknav\",s=\"slicknav\";t.prototype.init=function(){var t,a,i=this,l=n(this.element),o=this.settings;if(o.duplicate?(i.mobileNav=l.clone(),i.mobileNav.removeAttr(\"id\"),i.mobileNav.find(\"*\").each(function(e,t){n(t).removeAttr(\"id\")})):i.mobileNav=l,t=s+\"_icon\",\"\"===o.label&&(t+=\" \"+s+\"_no-text\"),\"a\"==o.parentTag&&(o.parentTag='a href=\"#\"'),i.mobileNav.attr(\"class\",s+\"_nav\"),a=n('<div class=\"'+s+'_menu\"></div>'),\"\"!==o.brand){var r=n('<div class=\"'+s+'_brand\">'+o.brand+\"</div>\");n(a).append(r)}i.btn=n([\"<\"+o.parentTag+' aria-haspopup=\"true\" tabindex=\"0\" class=\"'+s+\"_btn \"+s+'_collapsed\">','<span class=\"'+s+'_menutxt\">'+o.label+\"</span>\",'<span class=\"'+t+'\">','<span class=\"'+s+'_icon-bar\"></span>','<span class=\"'+s+'_icon-bar\"></span>','<span class=\"'+s+'_icon-bar\"></span>',\"</span>\",\"</\"+o.parentTag+\">\"].join(\"\")),n(a).append(i.btn),n(o.prependTo).prepend(a),a.append(i.mobileNav);var d=i.mobileNav.find(\"li\");n(d).each(function(){var e=n(this),t={};if(t.children=e.children(\"ul\").attr(\"role\",\"menu\"),e.data(\"menu\",t),t.children.length>0){var a=e.contents(),l=!1;nodes=[],n(a).each(function(){return n(this).is(\"ul\")?!1:(nodes.push(this),void(n(this).is(\"a\")&&(l=!0)))});var r=n(\"<\"+o.parentTag+' role=\"menuitem\" aria-haspopup=\"true\" tabindex=\"-1\" class=\"'+s+'_item\"/>');if(o.allowParentLinks&&!o.nestedParentLinks&&l)n(nodes).wrapAll('<span class=\"'+s+\"_parent-link \"+s+'_row\"/>').parent();else{var d=n(nodes).wrapAll(r).parent();d.addClass(s+\"_row\")}e.addClass(s+\"_collapsed\"),e.addClass(s+\"_parent\");var c=n('<span class=\"'+s+'_arrow\">'+o.closedSymbol+\"</span>\");o.allowParentLinks&&!o.nestedParentLinks&&l&&(c=c.wrap(r).parent()),n(nodes).last().after(c)}else 0===e.children().length&&e.addClass(s+\"_txtnode\");e.children(\"a\").attr(\"role\",\"menuitem\").click(function(e){o.closeOnClick&&!n(e.target).parent().closest(\"li\").hasClass(s+\"_parent\")&&n(i.btn).click()}),o.closeOnClick&&o.allowParentLinks&&(e.children(\"a\").children(\"a\").click(function(){n(i.btn).click()}),e.find(\".\"+s+\"_parent-link a:not(.\"+s+\"_item)\").click(function(){n(i.btn).click()}))}),n(d).each(function(){var e=n(this).data(\"menu\");o.showChildren||i._visibilityToggle(e.children,null,!1,null,!0)}),i._visibilityToggle(i.mobileNav,null,!1,\"init\",!0),i.mobileNav.attr(\"role\",\"menu\"),n(e).mousedown(function(){i._outlines(!1)}),n(e).keyup(function(){i._outlines(!0)}),n(i.btn).click(function(n){n.preventDefault(),i._menuToggle()}),i.mobileNav.on(\"click\",\".\"+s+\"_item\",function(e){e.preventDefault(),i._itemClick(n(this))}),n(i.btn).keydown(function(n){var e=n||event;13==e.keyCode&&(n.preventDefault(),i._menuToggle())}),i.mobileNav.on(\"keydown\",\".\"+s+\"_item\",function(e){var t=e||event;13==t.keyCode&&(e.preventDefault(),i._itemClick(n(e.target)))}),o.allowParentLinks&&o.nestedParentLinks&&n(\".\"+s+\"_item a\").click(function(n){n.stopImmediatePropagation()})},t.prototype._menuToggle=function(){var n=this,e=n.btn,t=n.mobileNav;e.hasClass(s+\"_collapsed\")?(e.removeClass(s+\"_collapsed\"),e.addClass(s+\"_open\")):(e.removeClass(s+\"_open\"),e.addClass(s+\"_collapsed\")),e.addClass(s+\"_animating\"),n._visibilityToggle(t,e.parent(),!0,e)},t.prototype._itemClick=function(n){var e=this,t=e.settings,a=n.data(\"menu\");a||(a={},a.arrow=n.children(\".\"+s+\"_arrow\"),a.ul=n.next(\"ul\"),a.parent=n.parent(),a.parent.hasClass(s+\"_parent-link\")&&(a.parent=n.parent().parent(),a.ul=n.parent().next(\"ul\")),n.data(\"menu\",a)),a.parent.hasClass(s+\"_collapsed\")?(a.arrow.html(t.openedSymbol),a.parent.removeClass(s+\"_collapsed\"),a.parent.addClass(s+\"_open\"),a.parent.addClass(s+\"_animating\"),e._visibilityToggle(a.ul,a.parent,!0,n)):(a.arrow.html(t.closedSymbol),a.parent.addClass(s+\"_collapsed\"),a.parent.removeClass(s+\"_open\"),a.parent.addClass(s+\"_animating\"),e._visibilityToggle(a.ul,a.parent,!0,n))},t.prototype._visibilityToggle=function(e,t,a,i,l){var o=this,r=o.settings,d=o._getActionItems(e),c=0;a&&(c=r.duration),e.hasClass(s+\"_hidden\")?(e.removeClass(s+\"_hidden\"),e.slideDown(c,r.easingOpen,function(){n(i).removeClass(s+\"_animating\"),n(t).removeClass(s+\"_animating\"),l||r.open(i)}),e.attr(\"aria-hidden\",\"false\"),d.attr(\"tabindex\",\"0\"),o._setVisAttr(e,!1)):(e.addClass(s+\"_hidden\"),e.slideUp(c,this.settings.easingClose,function(){e.attr(\"aria-hidden\",\"true\"),d.attr(\"tabindex\",\"-1\"),o._setVisAttr(e,!0),e.hide(),n(i).removeClass(s+\"_animating\"),n(t).removeClass(s+\"_animating\"),l?\"init\"==i&&r.init():r.close(i)}))},t.prototype._setVisAttr=function(e,t){var a=this,i=e.children(\"li\").children(\"ul\").not(\".\"+s+\"_hidden\");i.each(t?function(){var e=n(this);e.attr(\"aria-hidden\",\"true\");var i=a._getActionItems(e);i.attr(\"tabindex\",\"-1\"),a._setVisAttr(e,t)}:function(){var e=n(this);e.attr(\"aria-hidden\",\"false\");var i=a._getActionItems(e);i.attr(\"tabindex\",\"0\"),a._setVisAttr(e,t)})},t.prototype._getActionItems=function(n){var e=n.data(\"menu\");if(!e){e={};var t=n.children(\"li\"),a=t.find(\"a\");e.links=a.add(t.find(\".\"+s+\"_item\")),n.data(\"menu\",e)}return e.links},t.prototype._outlines=function(e){e?n(\".\"+s+\"_item, .\"+s+\"_btn\").css(\"outline\",\"\"):n(\".\"+s+\"_item, .\"+s+\"_btn\").css(\"outline\",\"none\")},t.prototype.toggle=function(){var n=this;n._menuToggle()},t.prototype.open=function(){var n=this;n.btn.hasClass(s+\"_collapsed\")&&n._menuToggle()},t.prototype.close=function(){var n=this;n.btn.hasClass(s+\"_open\")&&n._menuToggle()},n.fn[i]=function(e){var a=arguments;if(void 0===e||\"object\"==typeof e)return this.each(function(){n.data(this,\"plugin_\"+i)||n.data(this,\"plugin_\"+i,new t(this,e))});if(\"string\"==typeof e&&\"_\"!==e[0]&&\"init\"!==e){var s;return this.each(function(){var l=n.data(this,\"plugin_\"+i);l instanceof t&&\"function\"==typeof l[e]&&(s=l[e].apply(l,Array.prototype.slice.call(a,1)))}),void 0!==s?s:this}}}(jQuery,document,window);!function(n){var t=n(window),e=t.height();t.resize(function(){e=t.height()}),n.fn.parallax=function(o,r,i){function u(){var i=t.scrollTop();l.each(function(t,u){var l=n(u),f=l.offset().top,s=a(l);i>f+s||f>i+e||l.css(\"backgroundPosition\",o+\" \"+Math.round((l.data(\"firstTop\")-i)*r)+\"px\")})}var a,l=n(this);l.each(function(t,e){$element=n(e),$element.data(\"firstTop\",$element.offset().top)}),a=i?function(n){return n.outerHeight(!0)}:function(n){return n.height()},(arguments.length<1||null===o)&&(o=\"50%\"),(arguments.length<2||null===r)&&(r=.1),(arguments.length<3||null===i)&&(i=!0),t.bind(\"scroll\",u).resize(u),u()}}(jQuery);(function(e){\"use strict\";e.fn.fitVids=function(t){var n={customSelector:null};if(!document.getElementById(\"fit-vids-style\")){var r=document.head||document.getElementsByTagName(\"head\")[0];var i=\".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}\";var s=document.createElement(\"div\");s.innerHTML='<p>x</p><style id=\"fit-vids-style\">'+i+\"</style>\";r.appendChild(s.childNodes[1])}if(t){e.extend(n,t)}return this.each(function(){var t=[\"iframe[src*='player.vimeo.com']\",\"iframe[src*='youtube.com']\",\"iframe[src*='youtube-nocookie.com']\",\"iframe[src*='kickstarter.com'][src*='video.html']\",\"object\",\"embed\"];if(n.customSelector){t.push(n.customSelector)}var r=e(this).find(t.join(\",\"));r=r.not(\"object object\");r.each(function(){var t=e(this);if(this.tagName.toLowerCase()===\"embed\"&&t.parent(\"object\").length||t.parent(\".fluid-width-video-wrapper\").length){return}var n=this.tagName.toLowerCase()===\"object\"||t.attr(\"height\")&&!isNaN(parseInt(t.attr(\"height\"),10))?parseInt(t.attr(\"height\"),10):t.height(),r=!isNaN(parseInt(t.attr(\"width\"),10))?parseInt(t.attr(\"width\"),10):t.width(),i=n/r;if(!t.attr(\"id\")){var s=\"fitvid\"+Math.floor(Math.random()*999999);t.attr(\"id\",s)}t.wrap('<div class=\"fluid-width-video-wrapper\"></div>').parent(\".fluid-width-video-wrapper\").css(\"padding-top\",i*100+\"%\");t.removeAttr(\"height\").removeAttr(\"width\")})})}})(window.jQuery||window.Zepto)";
var mod_pagespeed_F9gKaYEq81 = "(function(){var container,button,menu;container=document.getElementById('site-navigation');if(!container){return;}button=container.getElementsByTagName('button')[0];if('undefined'===typeof button){return;}menu=container.getElementsByTagName('ul')[0];if('undefined'===typeof menu){button.style.display='none';return;}menu.setAttribute('aria-expanded','false');if(-1===menu.className.indexOf('nav-menu')){menu.className+=' nav-menu';}button.onclick=function(){if(-1!==container.className.indexOf('toggled')){container.className=container.className.replace(' toggled','');button.setAttribute('aria-expanded','false');menu.setAttribute('aria-expanded','false');}else{container.className+=' toggled';button.setAttribute('aria-expanded','true');menu.setAttribute('aria-expanded','true');}};})();";
var mod_pagespeed_8KLYCyPfbZ = "(function(){var is_webkit=navigator.userAgent.toLowerCase().indexOf('webkit')>-1,is_opera=navigator.userAgent.toLowerCase().indexOf('opera')>-1,is_ie=navigator.userAgent.toLowerCase().indexOf('msie')>-1;if((is_webkit||is_opera||is_ie)&&document.getElementById&&window.addEventListener){window.addEventListener('hashchange',function(){var id=location.hash.substring(1),element;if(!(/^[A-z0-9_-]+$/.test(id))){return;}element=document.getElementById(id);if(element){if(!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))){element.tabIndex=-1;}element.focus();}},false);}})();";
var mod_pagespeed_YL$UdB2EG_ = "var addComment={moveForm:function(a,b,c,d){var e,f,g,h,i=this,j=i.I(a),k=i.I(c),l=i.I(\"cancel-comment-reply-link\"),m=i.I(\"comment_parent\"),n=i.I(\"comment_post_ID\"),o=k.getElementsByTagName(\"form\")[0];if(j&&k&&l&&m&&o){i.respondId=c,d=d||!1,i.I(\"wp-temp-form-div\")||(e=document.createElement(\"div\"),e.id=\"wp-temp-form-div\",e.style.display=\"none\",k.parentNode.insertBefore(e,k)),j.parentNode.insertBefore(k,j.nextSibling),n&&d&&(n.value=d),m.value=b,l.style.display=\"\",l.onclick=function(){var a=addComment,b=a.I(\"wp-temp-form-div\"),c=a.I(a.respondId);if(b&&c)return a.I(\"comment_parent\").value=\"0\",b.parentNode.insertBefore(c,b),b.parentNode.removeChild(b),this.style.display=\"none\",this.onclick=null,!1};try{for(var p=0;p<o.elements.length;p++)if(f=o.elements[p],h=!1,\"getComputedStyle\"in window?g=window.getComputedStyle(f):document.documentElement.currentStyle&&(g=f.currentStyle),(f.offsetWidth<=0&&f.offsetHeight<=0||\"hidden\"===g.visibility)&&(h=!0),\"hidden\"!==f.type&&!f.disabled&&!h){f.focus();break}}catch(q){}return!1}},I:function(a){return document.getElementById(a)}};";
var mod_pagespeed_zHn7WvnZbb = "!function(a,b){\"use strict\";function c(){if(!e){e=!0;var a,c,d,f,g=-1!==navigator.appVersion.indexOf(\"MSIE 10\"),h=!!navigator.userAgent.match(/Trident.*rv:11\\./),i=b.querySelectorAll(\"iframe.wp-embedded-content\");for(c=0;c<i.length;c++){if(d=i[c],!d.getAttribute(\"data-secret\"))f=Math.random().toString(36).substr(2,10),d.src+=\"#?secret=\"+f,d.setAttribute(\"data-secret\",f);if(g||h)a=d.cloneNode(!0),a.removeAttribute(\"security\"),d.parentNode.replaceChild(a,d)}}}var d=!1,e=!1;if(b.querySelector)if(a.addEventListener)d=!0;if(a.wp=a.wp||{},!a.wp.receiveEmbedMessage)if(a.wp.receiveEmbedMessage=function(c){var d=c.data;if(d.secret||d.message||d.value)if(!/[^a-zA-Z0-9]/.test(d.secret)){var e,f,g,h,i,j=b.querySelectorAll('iframe[data-secret=\"'+d.secret+'\"]'),k=b.querySelectorAll('blockquote[data-secret=\"'+d.secret+'\"]');for(e=0;e<k.length;e++)k[e].style.display=\"none\";for(e=0;e<j.length;e++)if(f=j[e],c.source===f.contentWindow){if(f.removeAttribute(\"style\"),\"height\"===d.message){if(g=parseInt(d.value,10),g>1e3)g=1e3;else if(~~g<200)g=200;f.height=g}if(\"link\"===d.message)if(h=b.createElement(\"a\"),i=b.createElement(\"a\"),h.href=f.getAttribute(\"src\"),i.href=d.value,i.host===h.host)if(b.activeElement===f)a.top.location.href=d.value}else;}},d)a.addEventListener(\"message\",a.wp.receiveEmbedMessage,!1),b.addEventListener(\"DOMContentLoaded\",c,!1),a.addEventListener(\"load\",c,!1)}(window,document);";
