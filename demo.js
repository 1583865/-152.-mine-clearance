// 宽高 雷总数
		const width = 15, height = 15,COUNT = 30;
		let randarArr = [];
		let randarDom = document.getElementById('map');


		window.onload = function() {
			// 初始化
			init();
			// 创建雷
			createRandar();
			// 计算方格周围有多少雷
			roundRandarCount();
			// 渲染
			console.log(randarArr);
			render();
		}


		// 渲染地图
		function render() {
			let table = document.createElement('table');
			let tr;
			for(let i = 0;i<height;i++) {
				let tr = document.createElement('tr');
				for (let j = 0;j<width;j++) {
					let td = document.createElement('td');
					td.className = 'block';
					td.style.backgroundColor = '#BDBDBD';
					td.id = i+'-'+j;
					td.onclick = function() {
						click(i,j);
					}

					// // 调试用 显示所有雷
					// td.innerHTML = randarArr[i][j].roundCount;
					// if(randarArr[i][j].isRandar) {
					// 	td.innerHTML = '@';
					// }else {
					// 	td.innerHTML = randarArr[i][j].roundCount;
					// }
					tr.appendChild(td);
				}
				table.appendChild(tr);
			}
			randarDom.appendChild(table);
		}


		// 初始化数组
		function init() {
			for(let i = 0;i<height;i++) {
				randarArr[i] = [];
				for (let j = 0;j<width;j++) {
					randarArr[i][j] = {isShow:false, isRandar:false, roundCount:''};
				}
			}
		}


		// 创建雷
		function createRandar() {
			let count = 0;
			let i;
			let j;
			while(count < COUNT){
				i = Math.floor(Math.random() * height);
				j = Math.floor(Math.random() * width);
				if(randarArr[i][j].isRandar === false) {
					randarArr[i][j].isRandar = true;
					count ++;
				}
			}
		}


		// 计算方格周围有多少个雷
		function roundRandarCount() {
			for(let i = 0;i<height;i++) {
				let count = 0;
				for (let j = 0;j<width;j++) {
					// 左上
					if(i-1>=0&&j-1>=0){
						if(randarArr[i - 1][j - 1].isRandar) {
							count ++;
						}
					}
					// 上
					if(i-1>=0){
						if(randarArr[i-1][j].isRandar) {
							count ++;
						}
					}
					// 右上
					if(i-1>=0&&j+1<width) {
						if(randarArr[i-1][j+1].isRandar) {
							count ++;
						}
					}
					// 右
					if(j+1<width){
						if(randarArr[i][j+1].isRandar) {
							count ++;
						}
					}
					// 右下
					if(i+1<height&&j+1<width) {
						if(randarArr[i+1][j+1].isRandar) {
							count ++;
						}
					}
					// 下
					if(i+1<height){
						if(randarArr[i+1][j].isRandar) {
							count ++;
						}
					}
					// 左下
					if(i+1<height&&j-1>=0) {
						if(randarArr[i+1][j-1].isRandar) {
							count ++;
						}
					}
					// 左
					if(j-1>=0) {
						if(randarArr[i][j-1].isRandar) {
							count ++;
						}
					}
					if(count > 0) {
						randarArr[i][j].roundCount = count;
						count = 0;
					}
				}
			}
		}



		// 点击事件
		function click(i,j) {
			let currentDom = document.getElementById(i + '-' +j);
			let current = randarArr[i][j];
			if(current.isRandar){
				currentDom.style.backgroundColor ="#A4A4A4";
				currentDom.innerHTML = '<span style="color:red">@</span>';
				// 显示所有雷
				showAllrandar();
				alert('game over!!');
			}
			 showNumber(i,j);
		}


		// 显示数字 当前格子没有雷 就不判断自动显示
		function showNumber(i,j) {
			let currentDom = document.getElementById(i + '-' +j);
			let current = randarArr[i][j];
			if(current.isShow === false) {
				current.isShow = true;
				currentDom.style.backgroundColor ="#848484";
				currentDom.innerHTML = current.roundCount;
				if(current.roundCount === '') {
					// 左上
					if(i-1>=0&&j-1>=0){					
						showNumber(i-1,j-1);
					}
					// 上
					if(i-1>=0){						
						showNumber(i-1,j);
					}
					// 右上
					if(i-1>=0&&j+1<width) {					
						showNumber(i-1,j+1);
					}
					// 右
					if(j+1<width){	
						showNumber(i,j+1);
					}
					// 右下
					if(i+1<height&&j+1<width) {				
						showNumber(i+1,j+1);
					}
					// 下
					if(i+1<height){
						showNumber(i+1,j);
					}
					// 左下
					if(i+1<height&&j-1>=0) {
						showNumber(i+1,j-1);
					}
					// 左
					if(j-1>=0) {
						showNumber(i,j-1);
					}
				}
			}
		}



		// 显示所有雷
		function showAllrandar() {
			for(let i = 0;i<height;i++) {
				for (let j = 0;j<width;j++) {
					if(randarArr[i][j].isRandar){
						let dom = document.getElementById(i+ '-' +j);
						dom.style.backgroundColor ="#A4A4A4";
						dom.innerHTML = '<span style="color:red">@</span>';
					}
				}
			}
		}