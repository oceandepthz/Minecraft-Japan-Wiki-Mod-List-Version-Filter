// ==UserScript==
// @name        Minecraft Japan Wiki Mod List Version Filter
// @namespace   https://github.com/oceandepthz/Minecraft-Japan-Wiki-Mod-List-Version-Filter
// @include     http://www26.atwiki.jp/minecraft/pages/934.html
// @include     http://www26.atwiki.jp/minecraft/pages/935.html
// @include     http://www26.atwiki.jp/minecraft/pages/936.html
// @include     http://www26.atwiki.jp/minecraft/pages/937.html
// @version     0.1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// ==/UserScript==
(function($){
  var vlist = {};
  $('table tr').each(function(){
    var tr_obj = this;
    $(tr_obj).find('td').each(function(){
      var td_obj = this;
      var content = $(td_obj).html();
      if(content.match(/^[0-9.x]+$/)){
        var class_name = 'mcv' + content.replace(/\./g, '_');
        $(tr_obj).addClass(class_name);
        if(!(content in vlist)){
          vlist[content] = class_name;
        }
      }
    });
  });
  var content = "<div>";
  for(var version in vlist){
    var class_name = vlist[version];
    content += "<span style='margin:1em;padding:5px;border:solid 1px gray;background-color:azure;' class='ver_button'>" + version + "</span>";
  }
  content += "</div>";
  $(content).prependTo('#body');
  $('.ver_button').on('click', function(event){
    var self = this;
    var class_name = '.mcv' + $(self).html().replace(/\./g, '_');
    if($(self).hasClass('hiddenVersion')){
      $(class_name).show();
      $(self).css('background-color', 'azure').removeClass('hiddenVersion');
    }else{
      $(class_name).hide();
      $(self).css('background-color', 'silver').addClass('hiddenVersion');
    }
  });
})(jQuery);
