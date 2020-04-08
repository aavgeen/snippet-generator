document.addEventListener("DOMContentLoaded", function(event) {
            var description_textbox = document.getElementById("description-textbox");
            var tabtrigger_textbox = document.getElementById("tabtrigger-textbox");
            var snippet_area = document.getElementById("snippet-area");

            const vscode_snippet = document.getElementById("vscode-snippet");
            const sublime_snippet = document.getElementById("sublime-snippet");
            const atom_snippet = document.getElementById("atom-snippet");

            function changeSnippetValue(event) {
                changeVsCodeValue(event);
                changeSublimeValue(event);
                changeAtomValue(event);
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
  }
  `;
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
      </snippet>
         `;
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

            function getFormattedSnippet(snippet_text, hasQuotes) {
                if (hasQuotes) {
                    return `"${snippet_text[0]}",
        ${snippet_text.slice(1).map((val) => `\t"${val}"`).join(',\n')}`
          }

            return ` ${snippet_text[0]}
        ${snippet_text.slice(1).map((val) => `\t${val}`).join('\n')}`;
      }
  });