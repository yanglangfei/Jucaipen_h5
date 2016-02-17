//时间格式化
var subStr = function(type, str) {
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
	}



}