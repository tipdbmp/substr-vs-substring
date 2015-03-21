(function() { window.onload = function() {
    'use strict';

    document.title = 'substr vs substring';

    var $body = document.body;
    Dom.node_apply_style($body, {
        padding: '0px 20px 20px 20px',
    });


    var $heading = document.createElement('h2');
    Dom.node_apply_style($heading, {
        fontSize: '56px',
    });
    $heading.textContent = 'substr vs substring';


    var str_style = {
        marginTop: '20px',
        fontFamily: 'Verdana',
    };

    var rules_style = {
        listStyleType: 'none',
        fontSize: '20px',
    };

    var $substr = document.createElement('div');
    Dom.node_apply_style($substr, str_style);
    
    $substr.$title = document.createElement('span');
    Dom.node_apply_style($substr.$title, {
        fontSize: '35px',    
    });
    $substr.$title.textContent = '"string".substr(a, b = this.length - a)';

    $substr.$rules = document.createElement('ul');
    Dom.node_apply_style($substr.$rules, rules_style);

    Dom.node_push($substr,
        $substr.$title,
        $substr.$rules
    );

    var substr_rules = [
        '0 ≤ a < $, b = undefined  =>  [a, $), $ = string.length',
        '0 ≤ a < $, b > 0,  =>  [a, (a + b) min $)',
    ];
    for (
        var rules_index = 0;
        rules_index < substr_rules.length;
        rules_index++
    ) {
        var rule = substr_rules[rules_index];
        var $rule = document.createElement('li');
        Dom.node_apply_style($rule, {
            paddingBottom: '10px',
        });
        $rule.textContent = rule;
        Dom.node_push($substr.$rules, $rule);   
    }


    var $substring = document.createElement('div');
    Dom.node_apply_style($substring, str_style);
    
    $substring.$title = document.createElement('span');
    Dom.node_apply_style($substring.$title, {
        fontSize: '35px',    
    });
    $substring.$title.textContent 
        = '"string".substring(a, b = this.length - 1)';

    $substring.$rules = document.createElement('ul');
    Dom.node_apply_style($substring.$rules, rules_style);

    Dom.node_push($substring,
        $substring.$title,
        $substring.$rules
    );

    var substring_rules = [
        '0 ≤ a < $, b = undefined  =>  [a, $), $ = string.length',
        '0 ≤ a < b ≤ $ =>  [a, b)',
        '0 ≤ b < a ≤ $ =>  [b, a)',
    ];
    for (
        var rules_index = 0;
        rules_index < substring_rules.length;
        rules_index++
    ) {
        var rule = substring_rules[rules_index];
        var $rule = document.createElement('li');
        Dom.node_apply_style($rule, {
            paddingBottom: '10px',
        });
        $rule.textContent = rule;
        Dom.node_push($substring.$rules, $rule);   
    }


    var base_style = {
        marginTop: '20px',

        $label: {
            fontSize: '20px',
            paddingRight: '10px',
        },
        $input: {

        },
    };

    var big_input = Obj.merge({}, base_style, {

    });

    var small_input = Obj.merge({}, base_style, {
        display: 'inline',
        paddingRight: '30px',

        $label: {
            paddingRight: '5px',
        },
        $input: {
            width: '30px',
            textAlign: 'center',
        },
    });

    var $string = LabeledInput({
        label_text: 'Your String:',
        input_value: 'Hello, World!',
        input_placeholder: 'my string',

        style: big_input,

        on_input: result,
    });

    var $range = document.createElement('div');
    Dom.node_apply_style($range, {
        marginTop: '20px',
    });

    var $a = LabeledInput({
        label_text: 'a:',
        input_value: '3',

        style: small_input,

        on_input: range,
    });

    var $b = LabeledInput({
        label_text: 'b:',
        input_value: '6',

        style: small_input,

        on_input: range,
    });

    Dom.node_push($range, $a, $b);

    var $result = document.createElement('table');
    Dom.node_apply_style($result, {
        marginTop: '20px',
    });

    $result.$indecies = document.createElement('tr');
    $result.$substr = document.createElement('tr');
    $result.$substring = document.createElement('tr');

    $result.$substr_text = NamedRow('substr');
    $result.$substring_text = NamedRow('substring');

    Dom.node_push($result, 
        $result.$indecies,
        $result.$substr_text,
        $result.$substr,
        $result.$substring_text,
        $result.$substring
    );


    Dom.node_push($body,
        $heading,
        $substr,
        $substring,
        $string,
        $range,
        $result
    );

//     result();
    $string.$input.dispatchEvent(new Event('input'));

//     range();
    $a.$input.dispatchEvent(new Event('input'));

    function result(event) {
        var input_string = $string.$input.value;
//         if (!input_string) { return; }

        Dom.node_remove_all_children($result.$indecies);
        Dom.node_remove_all_children($result.$substr);
        Dom.node_remove_all_children($result.$substring);

        var cell_style = {
            padding: '5px',
            fontSize: '20px',
            border: '2px solid black',
            minWidth: '20px',
            textAlign: 'center',
        };

        for (
            var char_index = 0;
            char_index < input_string.length;
            char_index++
        ) {
            var char = input_string[char_index];

            var $index = document.createElement('td');
            Dom.node_apply_style($index, cell_style);
            $index.textContent = char_index;

            Dom.node_push($result.$indecies, $index); 

            var $letter = document.createElement('td');
            Dom.node_apply_style($letter, cell_style);
            $letter.textContent = char;

            Dom.node_push($result.$substr, $letter);
            Dom.node_push($result.$substring, $letter.cloneNode(true));     
        }

        
//         try {
//             range()
// //             $a.$input.dispatchEvent(new Event('input'));
//         } catch(ex) {
        
//         }
        var a = parseInt($a.$input.value, 10);
        var b = parseInt($b.$input.value, 10);
        if (!isNaN(a) && !isNaN(b) && Math.max(a, b) < input_string.length) {
            $a.$input.dispatchEvent(new Event('input'));  
        }
    }

    function range(event) {
        var a = parseInt($a.$input.value, 10);
        var b = parseInt($b.$input.value, 10);

        if (isNaN(a)) { return; }

        // substr [a, a + b)

        // reset the background first
        for (
            var letter_index = 0;
            letter_index < $result.$substr.cells.length;
            letter_index++
        ) {
            var $letter = $result.$substr.cells[letter_index];
            $letter.style.background = 'none';
        }

        var substr_a = a;
        var substr_b = b;
        if (isNaN(substr_b)) { substr_b = $string.$input.value.length - a; }
        var end_index = Math.min(a + substr_b, $string.$input.value.length);

        for (
            var letter_index = a;
            letter_index < end_index;
            letter_index++
        ) {
            var $letter = $result.$substr.cells[letter_index];
            $letter.style.background = 'red';
        }


        // substring [a, b)
        
        // reset the background first
        for (
            var letter_index = 0;
            letter_index < $result.$substring.cells.length;
            letter_index++
        ) {
            var $letter = $result.$substring.cells[letter_index];
            $letter.style.background = 'none';
        }

        var substring_a = a;
        var substring_b = b;
        if (isNaN(substring_b)) { substring_b = $string.$input.value.length; }
        if (substring_a > substring_b) {
            var tmp = substring_a;
            substring_a = substring_b;
            substring_b = tmp;    
        }
        var end_index = substring_b;

        for (
            var letter_index = substring_a;
            letter_index < end_index;
            letter_index++
        ) {
            var $letter = $result.$substring.cells[letter_index];
            $letter.style.background = 'red';
        }        
    }

    function LabeledInput(args) {
        var style             = args.style             || {};
        var label_text        = args.label_text        ||  '<label-text>';
        var input_value       = args.input_value       || '';
        var input_placeholder = args.input_placeholder || '';
        var on_input          = args.on_input;

        var $self = document.createElement('div');

        $self.$label = document.createElement('span');
        $self.$label.textContent = label_text;

        $self.$input = document.createElement('input');
        $self.$input.placeholder = input_placeholder;
        $self.$input.value = input_value;
        $self.$input.oninput = on_input;

        Dom.root_node_apply_style($self, style);

        Dom.node_push($self, 
            $self.$label,
            $self.$input
        );

        return $self;
    }

    function NamedRow(name) {
        var $self = document.createElement('tr');

        $self.$td = document.createElement('td');
        Dom.node_apply_style($self.$td, {
            textAlign: 'center',
            fontSize: '20px',
            padding: '10px 0px',
        });
        $self.$td.textContent = name;
        $self.$td.colSpan= 999;

        Dom.node_push($self, $self.$td);

        return $self;
    }
}}());