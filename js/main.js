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
                // console.log(event)
                let snippet = `
  "${description_textbox.value}": {
      "prefix": "${tabtrigger_textbox.value}",
      "body": [
          ${snippet_area.value.split("\n").map((val) => `"${val}",\n`)}
      ],
      "description": "${description_textbox.value}"
  }
  `;
      vscode_snippet.value = snippet;
    }
  
    function changeSublimeValue(event) {
      // console.log(event)
      let snippet = `
      <snippet>
      <content><![CDATA[
              ${snippet_area.value}
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
      // console.log(event)
      let snippet = `
  '${description_textbox.value}': 
  'prefix': '${tabtrigger_textbox.value}'
  'body': """
  ${snippet_area.value}
  """`;
      atom_snippet.value = snippet;
    }
  
    description_textbox.addEventListener("input", changeSnippetValue);
    tabtrigger_textbox.addEventListener("input", changeSnippetValue);
    snippet_area.addEventListener("input", changeSnippetValue);
  
    changeSnippetValue();
  });