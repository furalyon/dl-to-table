/*
* 
* dl-to-table
* 
* Convert a list of dls with common titles to a table for wider screens
* See in action https://codepen.io/furalyon/pen/EbEyRo
*
* By Ramkishore Manorahan - @furalyon
* 
*
* To use:
* 1. Include this script and the css file with the same name
* 2. Use the markup format as shown in the example.html
* 3. Style the ul, 'li's, 'dl's and tables, as needed.
*
* usage eg:

<div class="dl-to-table" data-table-class='add-classes-that-you-want-on-table'>
    <ul>
        <li>
            <dl>
                <dt>name</dt><dd>face</dd>
                <dt>age</dt><dd>44</dd>
                <dt>score</dt><dd>70</dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>name</dt><dd>mint</dd>
                <dt>age</dt><dd>45</dd>
                <dt>score</dt><dd>78</dd>
            </dl>
        </li>
    </ul>
</div>

*
* Note: A page can have multiple sets of this but nesting doesn't work
*
*/


(function(window, document, undefined)
{

    var hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    };

    var addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    };

    var tabularize = function() {
        var sets = document.querySelectorAll('.dl-to-table');
        for (var i=0; i<sets.length; i++) {
            var set = sets[i];
            var list_array = set.querySelectorAll('ul>li>dl');
            var table = document.createElement('table');
            var table_class = set.getAttribute('data-table-class');
            if (table_class) {
                addClass(table, table_class);
            }

            //create heading row
            var heading_tr = document.createElement('tr');
            var dt_in_one_dl = list_array[0].querySelectorAll('dt');
            for (var j=0; j<dt_in_one_dl.length; j++) {
                var heading = document.createElement('th');
                var heading_text = document.createTextNode(
                    dt_in_one_dl[j].innerText);
                heading.appendChild(heading_text);
                heading_tr.appendChild(heading);
            }
            table.appendChild(heading_tr);

            //create data row
            for (j=0; j<list_array.length; j++) {
                var row = list_array[j];
                var tr = document.createElement('tr');
                var dds = row.querySelectorAll('dd');
                for (k=0; k<dds.length; k++) {
                    var data = document.createElement('td');
                    var data_text = document.createTextNode(
                        dds[k].innerText);
                    data.appendChild(data_text);
                    tr.appendChild(data);
                }
                table.appendChild(tr);
            }
            var ul = set.querySelector('ul');
            addClass(ul, 'dl-to-table__hide-for-desktop');
            addClass(table, 'dl-to-table__hide-for-mobile');
            set.appendChild(table);
        }

    };

    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', tabularize, false);
    }

})(window, window.document);
