$( document ).ready(function() {
    var sum;

    //number 
    //-------------------------
    $('.number-section a').on('click', function () {
        var key = $(this).text();
        var inputValue = $('.monitor-section input').val()
        if (key == '=') return false
        $('.monitor-section input').val(inputValue + key)

        //push number
        if (sum) {
            sum = sum + key
        } else {
            sum = key
        }

    });

    //oparetore 
    //-------------------------
    $('.operators a').on('click', function () {

        var key = $(this).text();
        var oparet = $(this).attr('oparet');
        var inputValue = $('.monitor-section input').val();

        if (isNaN(inputValue.slice(-1)) || key == '=') return false
        $('.monitor-section input').val(inputValue + key);

        //push number
        sum = sum + oparet
    });


    //equle sing
    //show the result  
    //-------------------------
    $('.equle').on('click', function () {
        var inputValue = $('.monitor-section input').val();
        if (isNaN(inputValue.slice(-1))) {
            $('.monitor-section input').val(sum.slice(0, -1));

            //push number
            sum = sum.slice(0, -1);
        } else {
            $('.monitor-section input').val(calculate(sum));

            //push number
            sum = calculate(sum)
        }


    });


    $('.clear').on('click', function () {
        $('.monitor-section input').val('');
        sum = undefined
    });


    function calculate(input) {

        var f = {
            add: '+',
            sub: '-',
            div: '/',
            mlt: '*',
            mod: '%',
            exp: '^'
        };
        f.ooo = [
            [
                [f.mlt],
                [f.div],
                [f.mod],
                [f.exp]
            ],
            [
                [f.add],
                [f.sub]
            ]
        ];

        input = input.replace(/[^0-9%^*\/()\-+.]/g, '');

        var output;
        for (var i = 0, n = f.ooo.length; i < n; i++) {
            var re = new RegExp('(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])(\\d+\\.?\\d*)');
            re.lastIndex = 0;
            while (re.test(input)) {
                output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
                if (isNaN(output) || !isFinite(output))
                    return output;
                input = input.replace(re, output);
            }
        }

        return output;

        function _calculate(a, op, b) {
            a = a * 1;
            b = b * 1;
            switch (op) {
                case f.add:
                    return a + b;
                    break;
                case f.sub:
                    return a - b;
                    break;
                case f.div:
                    return a / b;
                    break;
                case f.mlt:
                    return a * b;
                    break;
                case f.mod:
                    return a % b;
                    break;
                case f.exp:
                    return Math.pow(a, b);
                    break;
                default:
                    null;
            }
        }
    }
});