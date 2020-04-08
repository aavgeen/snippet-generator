document.addEventListener("DOMContentLoaded", function(event) {
            var html = document.getElementsByTagName('html')[0];
            var description_textbox = document.getElementById("description-textbox");
            var tabtrigger_textbox = document.getElementById("tabtrigger-textbox");
            var snippet_area = document.getElementById("snippet-area");
            var mode = 'vscode';
            const vscode_snippet = document.getElementById("vscode-snippet");
            const sublime_snippet = document.getElementById("sublime-snippet");
            const atom_snippet = document.getElementById("atom-snippet");

            const vscode_toggle = document.getElementById('vscode_toggle');
            const sublime_toggle = document.getElementById('sublime_toggle');
            const atom_toggle = document.getElementById('atom_toggle');

            function changeurl() {
                let new_url = `/?description=${description_textbox.value}&tabtrigger=${tabtrigger_textbox.value}&snippet=${encodeURIComponent(snippet_area.value)}&mode=${mode}`
                window.history.pushState('data', 'Title', new_url);
            }

            function changeSnippetValue(event) {
                changeVsCodeValue(event);
                changeSublimeValue(event);
                changeAtomValue(event);
                changeurl();
            }

            function changeVsCodeValue(event) {
                let snippet_lines = snippet_area.value.split("\n");
                let snippet = `
  "${description_textbox.value}": {
      "prefix": "${tabtrigger_textbox.value}",
      "body": [
        ${getFormattedSnippet(snippet_lines, true)}
      ],
      "description": "${description_textbox.value}"
  }`;
                vscode_snippet.value = snippet;
            }

            function changeSublimeValue(event) {

                let snippet_lines = snippet_area.value.split("\n");
                let snippet = `
      <snippet>
        <content><![CDATA[
        ${getFormattedSnippet(snippet_lines, false)}
        ]]></content>
        <tabTrigger>${tabtrigger_textbox.value}</tabTrigger>
        <description>${description_textbox.value}</description>
        <!-- Optional: Set a scope to limit where the snippet will trigger -->
        <!-- <scope >source.python</scope > -->
      </snippet>`;
                sublime_snippet.value = snippet;
            }

            function changeAtomValue(event) {

                let snippet_lines = snippet_area.value.split("\n");
                let snippet = `
  '${description_textbox.value}': 
  'prefix': '${tabtrigger_textbox.value}'
  'body': """
        ${getFormattedSnippet(snippet_lines, false)}
    """`;
                atom_snippet.value = snippet;
            }

            description_textbox.addEventListener("input", changeSnippetValue);
            tabtrigger_textbox.addEventListener("input", changeSnippetValue);
            snippet_area.addEventListener("input", changeSnippetValue);

            changeSnippetValue();
            snippet_area.addEventListener("keydown", (e) => {
                let { keyCode } = e;
                let { value, selectionStart, selectionEnd } = snippet_area;

                if (keyCode === 9) { // TAB = 9
                    e.preventDefault();

                    snippet_area.value = value.slice(0, selectionStart) + "\t" + value.slice(selectionEnd);

                    snippet_area.setSelectionRange(selectionStart + 2, selectionStart + 2)
                }
            });
            let radios = [vscode_toggle, sublime_toggle, atom_toggle];
            radios.forEach((radio) => {
                radio.addEventListener('click', (event) => {
                    if (event.target.value === "VSCode") {
                        html.setAttribute("style", "--main-theme-color: #026EC5");
                        mode = 'vscode'
                    } else if (event.target.value === "SublimeText") {
                        html.setAttribute("style", "--main-theme-color: #c48f4e");
                        mode = "sublimetext"
                    } else if (event.target.value === "Atom") {
                        html.setAttribute("style", "--main-theme-color: #66595C");
                        mode = "atom"
                    }
                    changeurl();
                })
            });
            console.log(document.querySelectorAll('.copy-snippet-button'))
            Array.from(document.querySelectorAll('.copy-snippet-button')).forEach((btn) => {
                console.log("GOTOT")
                btn.addEventListener('click', (event) => {
                    console.log(event)
                    let editor = event.target.getAttribute('data-editor');
                    if (editor == 'vscode') {
                        vscode_snippet.select();
                        document.execCommand('copy');
                    } else if (editor == 'sublime') {
                        sublime_snippet.select();
                        document.execCommand('copy');
                    } else if (editor == 'atom') {
                        atom_snippet.select();
                        document.execCommand('copy');
                    }
                })
            })

            function getFormattedSnippet(snippet_text, hasQuotes) {
                if (hasQuotes) {
                    return `"${snippet_text[0]}",
        ${snippet_text.slice(1).map((val) => `\t"${val}"`).join(',\n')}`
          }

            return ` ${snippet_text[0]}
        ${snippet_text.slice(1).map((val) => `\t${val}`).join('\n')}`;
      }
  });