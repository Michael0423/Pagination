(function($){

    // template 
    var iconBtn = $("<div>").addClass("ui-pagination-item active").append($("<a>").attr("href", "#").append($("<i>").addClass("fa")));
    var indexBtn = $("<div>").addClass("ui-pagination-item").append($("<a>").attr("href", "#"));

    $.fn.pagination = function ( options ) {
        var opts = $.extend({}, $.fn.pagination.defaultOption, options);
        return new Pagination($(this), opts);
    };

    $.fn.pagination.defaultOption = {
        totalPage: 1,
        onSelect: function ( index, el ) {}
    };
    
    function Pagination ($container, opts) {
        this.totalPage = (parseInt(opts.totalPage) < 1) ? 1 : parseInt(opts.totalPage);
        this.currentPage = 1;
        var self = this;

        this.isEnd = function(){
            return (self.currentPage < 1 || self.currentPage > self.totalPage);
        }

        this.toTop = function(){
            self.currentPage = 1;
            self.render();
            if(typeof opts.onSelect === "function"){
                opts.onSelect(self.currentPage, null);
            }
        }

        this.toBottom = function(){
            self.currentPage = self.totalPage;
            self.render();
            if(typeof opts.onSelect === "function"){
                opts.onSelect(self.currentPage, null);
            }
        }

        this.toPrev = function() {
            self.currentPage--;
            if(self.isEnd()) self.currentPage = 1;
            self.render();
            if(typeof opts.onSelect === "function"){
                opts.onSelect(self.currentPage, null);
            }
        }

        this.toNext = function() {
            self.currentPage++;
            if(self.isEnd()) self.currentPage = self.totalPage;
            self.render();
            if(typeof opts.onSelect === "function"){
                opts.onSelect(self.currentPage, null);
            }
        }

        this.gotoPage = function (index) {
            self.currentPage = index;
            self.render();
            if(typeof opts.onSelect === "function"){
                opts.onSelect(self.currentPage, null);
            }
        }

        this.render = function () {
            $container.empty();
    
            let totalPage = self.totalPage;
            let currentPage = self.currentPage;

            // 回到第一頁
            let topBtn = iconBtn.clone();
            $(topBtn).find("i").addClass("fa-angle-double-left");
            $(topBtn).click(function(){
                self.toTop()
            });

            // 上一頁
            let prevBtn = iconBtn.clone();
            $(prevBtn).find("i").addClass("fa-angle-left");
            $(prevBtn).click(function(){
                self.toPrev();
            });

            // 下一頁
            let nextBtn = iconBtn.clone();
            $(nextBtn).find("i").addClass("fa-angle-right");
            $(nextBtn).click(function(){
                self.toNext();
            });

            // 回到最後一頁
            let bottomBtn = iconBtn.clone();
            $(bottomBtn).find("i").addClass("fa-angle-double-right");
            $(bottomBtn).click(function(){
                self.toBottom();
            });

            // btn active
            if(self.currentPage == 1){
                $(topBtn).unbind("click").removeClass("active");
                $(prevBtn).unbind("click").removeClass("active");
            }
            if(self.currentPage == self.totalPage){
                $(nextBtn).unbind("click").removeClass("active");
                $(bottomBtn).unbind("click").removeClass("active");
            }

            // 頁碼處理
            let indexArr = [];
            if(totalPage <= 5){
                for (let index = 1; index <= self.totalPage; index++) {
                    indexArr.push(index);
                }
            }else if(currentPage-2 <= 0){
                indexArr = [1, 2, 3, 4, 5];
            }else if(currentPage+2 >= totalPage){
                indexArr = [totalPage-4, totalPage-3, totalPage-2, totalPage-1, totalPage];
            }else{
                indexArr = [currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2];
            }
            $container.append(topBtn, prevBtn);
            indexArr.forEach(index => {
                let i = indexBtn.clone();
                i.find("a").text(index);
                i.click(function(){
                    self.gotoPage(index);

                    if(typeof opts.onSelect === "function"){
                        opts.onSelect(index, i);
                    }
                });

                if(index == self.currentPage) i.addClass("active");

                $container.append(i);
            });
            $container.append(nextBtn, bottomBtn); 

            // 目前頁數/總頁數
            if(opts.showRemind){
                $container.append($("<div>").addClass("pull-right").text(self.currentPage+"/"+self.totalPage));
            }   
        }                

        $container.addClass("ui-pagination");
        self.render(self.totalPage, self.currentPage);
    }

})(jQuery);