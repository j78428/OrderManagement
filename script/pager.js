    function showPager(selector,page,pageSize,total,linkTemplate){    
        if(total==0) {
            if($(selector)!=null) {
                $(selector).hide();
            }
            return;
        } else {
            $(selector).show();
        }

        var pager = $(selector); 
        if(total==0) {
            pager.hide();
        } else {
            pager.show();
        }

        page = parseInt(page);
        var lastPage = Math.ceil(total/pageSize);
        var Point = $('<li><a href="javascript:return false">...</a></li>');
        var First = $('<li><a href="'+linkTemplate.replace('<page>',1)+'">1</a></li>');
        var PrePage = $('<li><a href="'+linkTemplate.replace('<page>',page-1)+'">上一頁</a></li>');
        var PageNum = $('<li><a href="'+linkTemplate.replace('<page>',1)+'">1</a></li>');
        var NextPage = $('<li><a href="'+linkTemplate.replace('<page>',page+1)+'">下一頁</a></li>');
        var Last = $('<li><a href="'+linkTemplate.replace('<page>',lastPage)+'">'+lastPage+'</a></li>');
        pager.find('li').remove();
 
        var pages = new Object();
		pages[1] = true;
		pages[lastPage] = true;	
		range_page = 3;
        var startPage = 1;
        var endPage = page+range_page-1;  

        if(page<=3) {
            startPage = 1;
        } else {
            startPage = page -(range_page-2);

            if(lastPage >range_page && lastPage-startPage<range_page) {
                startPage = lastPage - (range_page-1);
            }
        }

        if(lastPage <=range_page) {
            endPage = lastPage;
        } else {			
            endPage = page + (range_page-2);      

            if(endPage>lastPage) {
                endPage = lastPage;
            }
        }
		
		if((startPage-2)==1) {
			startPage = 2;
		}

		if(endPage==2 && (endPage+1)<lastPage){
			endPage = endPage+1;
		}
		
		if((endPage+2)==lastPage) {
			endPage = lastPage-1;
		}

        if(page>1) {
			pager.append(PrePage);
        }

        if(page!=1) {
            pager.append(First);
        } else {
            First.find('a').attr('href','javascript:return false');
            First.addClass('active')
            pager.append(First);			
        }

        if(startPage>2) {
            pager.append(Point.clone());
        }

        for(var i=startPage;i<=endPage;i++) {
            var objPageNum = PageNum.clone();
            objPageNum.find('a').attr('href',linkTemplate.replace('<page>',i));
            objPageNum.find('a').html(i);

            if(i==page) {
                objPageNum.addClass('active');
            }

			if(pages[i]==null) {
				pager.append(objPageNum);
				pages[i] = true;
			}			
        }

        if(endPage<lastPage-1) {
            pager.append(Point.clone());
        }

        if(lastPage!=1) {
            if(page!=lastPage && total !=0) {
                pager.append(Last);
            } else {
                Last.find('a').attr('href','javascript:return false');
                Last.addClass('active');
                pager.append(Last);
            }
        }		

        if(page<lastPage) {
            pager.append(NextPage);
        }
    }