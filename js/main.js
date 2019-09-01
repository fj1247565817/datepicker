(function(){
	var datepicker = window.datepicker;
	var monthData;
	var $content;
	
	datepicker.buildUi = function(year, month){
		monthData = datepicker.getMonthData(year, month);
		
		var html = '<div class="ui-datepicker-header">'+
				'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>'+
				'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>'+
				'<span class="ui-datepicker-curr-month">'+
				monthData.year+'-'+monthData.month
				+'</span>'+
			'</div>'+
			'<div class="ui-datepicker-body">'+
				'<table>'+
					'<thead>'+
						'<tr>'+
							'<th>一</th>'+
							'<th>二</th>'+
							'<th>三</th>'+
							'<th>四</th>'+
							'<th>五</th>'+
							'<th>六</th>'+
							'<th>七</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody>';
					
					for(var i = 0; i<monthData.days.length;i++){
						var data = monthData.days[i];
						if(i%7 === 0){
							html += '<tr>';
						}
						html += '<td data-date="'+ data.date + '">' + data.showDate + '</td>';
						if(i%7 === 6){
							html += '</tr>';
						}
					}
					
					html += '</tbody>'+
				'</table>'+
			'</div>';
		return html;
	};
	
	datepicker.render = function(direction){
		var year,month;
		
		if(monthData){
			year = monthData.year;
			month = monthData.month;
		}
		
		if(direction === 'prev') {month -= 1;console.log(month);}
		if(direction === 'next') {month += 1;console.log(month);} 
		
		var html = datepicker.buildUi(year,month);
		// $dom.innerHTML = html;
		var content = document.querySelector('.ui-datepicker-content');
		if(!content){
			$content = document.createElement('div');
			$content.className = 'ui-datepicker-content';
			document.body.appendChild($content);
		}
		$content.innerHTML = html;
		
		
	}
	
	datepicker.init = function(input){
		
		datepicker.render();
		var $input = document.querySelector(input);
		var isOpen = false;
		
		$input.addEventListener('click',function(){
			if(isOpen){
				$content.classList.remove('ui-datepicker-content-show');
				isOpen = false;
			}else{
				$content.classList.add('ui-datepicker-content-show');
				var left = $input.offsetLeft;
				var top = $input.offsetTop;
				var height = $input.offsetHeight;
				$content.style.top = top + height + 2 + 'px';
				$content.style.left = left;
				isOpen = true;
			}
		},false);
		
		$content.addEventListener('click', function(e){
			var $target = e.target;
			if(!$target.classList.contains('ui-datepicker-btn'))return;
			
			if($target.classList.contains('ui-datepicker-prev-btn')){
				// console.log($target.classList.contains('ui-datepicker-prev-btn'))
				datepicker.render('prev');
			}else if($target.classList.contains('ui-datepicker-next-btn')){
				datepicker.render('next');
			}
		},false);
		
		$content.addEventListener('click',function(e){
			var $target = e.target;
			// console.log($target.dataset.date);
			if($target.tagName.toLowerCase() !== 'td')return;
			var date = new Date(monthData.year,monthData.month-1,$target.dataset.date);
			$input.value = format(date);
			if(isOpen){
				$content.classList.remove('ui-datepicker-content-show');
				isOpen = false;
			}
		},false);
		
	};
	
	function format(date){
		ret = '';
		var padding = function (num){
			if(num <= 9){
				return '0' + num;
			}
			return num;
		}
		// console.log(date)
		ret += date.getFullYear() + '-';
		ret += padding(date.getMonth() + 1) + '-';
		ret += padding(date.getDate());
		
		return ret;
	}
})();