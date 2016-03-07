//时间格式化
var subStr = function(type, str) {
	if(str==null||str.length<=0){
		return "";
	}
	var year = str.substr(0, 4);
	var index1 = str.indexOf('-');
	var lastIndex = str.lastIndexOf('-');
	var mins1 = parseInt(lastIndex) - (parseInt(index1) + 1);
	var moth = str.substr(parseInt(index1) + 1, mins1);
	var index3 = str.indexOf(' ');
	var mins2 = index3 - lastIndex;
	var day = str.substr(lastIndex + 1, mins2);
	var index4 = str.indexOf(':');
	var index4 = str.indexOf(':');
	var hour = str.substr(index3 + 1, 2);
	var index5 = str.lastIndexOf(':');
	var min = str.substr(index4 + 1, 2);
	var second = str.substr(index5 + 1, 2);
	var dates = new Date();
	var currentYear = dates.getFullYear();
	var currentMoth = dates.getMonth() + 1;
	var currentDay = dates.getDate();
	var currentHour=dates.getHours();
	var currentMin=dates.getMinutes();
	if (type == 0) {
		//名家看盘
		if (currentYear == year && currentMoth == moth && currentDay == day) {
			//今日主题
			return '今日主题';
		}
		if (currentYear == year && moth == currentMoth && day == currentDay - 1) {
			//昨日主题
			return '昨日主题';
		}
		return year + "/" + moth + "/" + day;
	} else if (type == 1) {
		//文字直播  HH:mm:ss
		return hour + ":" + min + ":" + second;
	}else if(type==2){
		//返回 格式  yyyy/mm/dd hh:mm
		return year+"-"+moth+"-"+day+" "+hour+":"+min;
	}else if(type==3){
		//返回格式   yyyy-mm-dd
		return year+"-"+moth+"-"+day;
	}else if(type==4){
		//投资观点
		if(currentYear==year&&currentMoth==moth&&currentDay==day){
			var hourMint=currentHour-hour;
			var minMint=currentMin-min;
			if(hourMint!=0&&minMint!=0){
				return hourMint+"小时"+minMint+"分前";
			}else if(hourMint==0&&minMint!=0){
				return minMint+"分前";
			}else if(hourMint!=0&&minMint==0){
				return hourMint+"小时前";
			}else{
				return '刚刚';
			}
		}
		return year+"-"+moth+"-"+day;
	}else if(type==5){
		return hour + ":" + min;
	}
}




//时间格式化
var subChatStr = function(type, str) {
	if(str==null&&str.length<=0){
		return "";
	}
	var year = str.substr(0, 4);
	var index1 = str.indexOf('/');
	var lastIndex = str.lastIndexOf('/');
	var mins1 = parseInt(lastIndex) - (parseInt(index1) + 1);
	var moth = str.substr(parseInt(index1) + 1, mins1);
	var index3 = str.indexOf(' ');
	var mins2 = index3 - lastIndex;
	var day = str.substr(lastIndex + 1, mins2);
	var index4 = str.indexOf(':');
	var index4 = str.indexOf(':');
	var hour = str.substr(index3 + 1, 2);
	var index5 = str.lastIndexOf(':');
	var min = str.substr(index4 + 1, 2);
	var second = str.substr(index5 + 1, 2);
	var dates = new Date();
	var currentYear = dates.getFullYear();
	var currentMoth = dates.getMonth() + 1;
	var currentDay = dates.getDate();
	var currentHour=dates.getHours();
	var currentMin=dates.getMinutes();
	if (type == 0) {
		//名家看盘
		if (currentYear == year && currentMoth == moth && currentDay == day) {
			//今日主题
			return '今日主题';
		}
		if (currentYear == year && moth == currentMoth && day == currentDay - 1) {
			//昨日主题
			return '昨日主题';
		}
		return year + "/" + moth + "/" + day;
	} else if (type == 1) {
		//文字直播  HH:mm:ss
		return hour + ":" + min + ":" + second;
	}else if(type==2){
		//返回 格式  yyyy/mm/dd hh:mm
		return year+"-"+moth+"-"+day+" "+hour+":"+min;
	}else if(type==3){
		//返回格式   yyyy-mm-dd
		return year+"-"+moth+"-"+day;
	}else if(type==4){
		//投资观点
		if(currentYear==year&&currentMoth==moth&&currentDay==day){
			var hourMint=currentHour-hour;
			var minMint=currentMin-min;
			if(hourMint!=0&&minMint!=0){
				return hourMint+"小时"+minMint+"分前";
			}else if(hourMint==0&&minMint!=0){
				return minMint+"分前";
			}else if(hourMint!=0&&minMint==0){
				return hourMint+"小时前";
			}else{
				return '刚刚';
			}
		}
		return year+"-"+moth+"-"+day;
	}
}


var dateForm=function(str){
	var year = str.substr(0, 4);
	var index1 = str.indexOf('-');
	var lastIndex = str.lastIndexOf('-');
	var mins1 = parseInt(lastIndex) - (parseInt(index1) + 1);
	var moth = str.substr(parseInt(index1) + 1, mins1);
	var index3 = str.indexOf(' ');
	var mins2 = index3 - lastIndex;
	var day = str.substr(lastIndex + 1, mins2);
	var time=new Date();
	time.setYear(year);
	time.setMonth(moth,day);
	return time;
}

//计算指定时间与今天的时间差
var dateDistance=function(str){
	var year = str.substr(0, 4);
	var index1 = str.indexOf('-');
	var lastIndex = str.lastIndexOf('-');
	var mins1 = parseInt(lastIndex) - (parseInt(index1) + 1);
	var moth = str.substr(parseInt(index1) + 1, mins1);
	var index3 = str.indexOf(' ');
	var mins2 = index3 - lastIndex;
	var day = str.substr(lastIndex + 1, mins2);
	var today=new Date();
	var currentYear=today.getFullYear();
	var currentMoth=today.getMonth()+1;
	var currentDay=today.getDate();
	var currentD=currentYear*365+currentMoth*30+currentDay;
	var D=year*365+moth*30+day;
	return parseInt(currentD)-parseInt(D);
}
