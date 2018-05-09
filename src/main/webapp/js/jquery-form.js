/**
 * Created by Administrator on 2017/8/1.
 */
$.fn.serializeJson=function(otherString){
    var serializeObj={},
        array=this.serializeArray();
    $(array).each(function(){
        if(serializeObj[this.name]){
            serializeObj[this.name]+=';'+this.value;
        }else{
            serializeObj[this.name]=this.value;
        }
    });

    if(otherString!=undefined){
        var otherArray = otherString.split(';');
        $(otherArray).each(function(){
            var otherSplitArray = this.split(':');
            serializeObj[otherSplitArray[0]]=otherSplitArray[1];
        });
    }
    return serializeObj;
};