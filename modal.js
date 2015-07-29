//
//constructor
//
MODAL.defaultOptions = {
    '$content': '这是一个modal',
    'autoClose': true,
    'escClose': true,
    'allowClose': true,
    'closeClass': 'close'
};
function MODAL(options) {
    this.options = $.extend({}, MODAL.defaultOptions, options);

    this.$content = options['$content'];

    this.init();
};

MODAL.prototype.constructor = MODAL;

MODAL.prototype.init = function() {
    var _self = this;
    _self.$content.wrap('<div class="mask"><div class="modal"><div class="body"></body></div></div>');
    _self.$wrap = _self.$content.closest('.mask');
    _self.$content.show();
    if(_self.options.allowClose) {
        _self.$content.parent().before('<span href="javascript:void(0);" class="'+_self.options.closeClass+'">×</span>');
    }
    if(_self.options.autoClose) {
        _self.$wrap.click(function(e) {
            if($(e.target).closest('.modal').length === 0) {
                _self.$wrap.hide();
            }
        });
    }

    if(_self.options.escClose) {
        $(document).on('keyup', function(e) {
            if(e.which === 27) {
                _self.$wrap.hide();
            }
        })
    }

    _self.$wrap.on('click', '.' + _self.options.closeClass, function() {
        _self.$wrap.hide();
    })
};
MODAL.prototype.show = function() {
    this.$wrap.show();
};

$.fn.modal = function() {
    this.each(function() {
        $(this).click(function() {
            var _self = $(this);
            var instance = _self.data('modal-instance');
            if(instance) {
                instance.show();
            }
            else {
                instance = new MODAL({
                    '$content': $(_self.attr('modal-target'))
                });
                _self.data('modal-instance', instance);
            }
            instance.show();
        })
    })
};
