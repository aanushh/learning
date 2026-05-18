// https://he-s3.s3.amazonaws.com/media/uploads/45245d85-f088-4274-abed-2215a01bb322.png

import React, { useState, useRef } from "react";

const REGEX = {
  COUNT_LETTERS: /./g,
  COUNT_WORDS: /\S+/g,
  COUNT_NUMBERS: /\d/g,
  COUNT_SPACES: /\s/g,
  COUNT_SPECIAL_CHARS: /[~!@#$%^&*()_+\-=\[\]{};'\\/:"|,./<>?]/g,
};

type TextCasing = "capitalize" | "uppercase" | "lowercase";
type TextAlignment = "left" | "center" | "right";

interface Analysis {
  bold: boolean;
  italian: boolean;
  underline: boolean;
  quotes: boolean;
  currCase: TextCasing;
  align: TextAlignment;
  font: number;
  no_of_letters: number;
  no_of_words: number;
  no_of_integers: number;
  no_of_spaces: number;
  no_of_specialsymbols: number;
}

const Editor = () => {
  // some useStates used to store the values of the properties. Change as you please . The values in these states are default values.

  const [text, settext] = useState("");
  const [bold, setbold] = useState(false);
  const [italian, setitalian] = useState(false);
  const [underline, setunderline] = useState(false);
  const [font, setfont] = useState(16);
  const [align, setalign] = useState<TextAlignment>("left");
  const [quotes, setquotes] = useState(false);
  const [currCase, setcurrCase] = useState<TextCasing>("capitalize");
  const [Analysis, setAnalysis] = useState<Analysis>({} as never);
  const [HTMLCODE, setHTMLCODE] = useState("");

  const Bold = (e) => {
    // this function is used to make the text bold in textarea
  };

  const Italian = () => {
    // this function is used to make the text italian
  };

  const Underline = () => {
    // this function is used to make the text underline
  };

  const changeFont = (operation: number) => {
    //  this function is used to increase or decrease the font by 1 . operation ==1 means increase by 1 else decrease by 1.
  };

  const changeAlign = (alignment) => {
    // this function is used to set the alignment of the text in text area i.e either left ,right or center
  };

  const Quotes = () => {
    //this function should add double quotes on the text present in the text area.
  };

  const caseChange = (c) => {
    //  this function should change the case of the text present in the text area i.e if c=='u' uppercase , if c=='l' lowercase
    // else capitalize
  };

  const reset = () => {
    // set the values of all the properties to default.
  };

  const Analyse = () => {
    //  this function should analyze the text present in the text area and generate the following results and display thaat result in the analysis text area
    //  the result object should contain following details:
    /* {
      no_of_letters,
      no_of_words,
      no_of_integers,
      no_of_spaces,
      no_of_specialsymbols,
      bold,
      italian,
      underline,
      quotes,
      currCase,
      align,
      font
      
    } */

    const noOfLetters = (text.match(REGEX.COUNT_LETTERS) || []).length;
    const noOfWords = (text.match(REGEX.COUNT_WORDS) || []).length;
    const noOfIntegers = (text.match(REGEX.COUNT_NUMBERS) || []).length;
    const noOfSpace = (text.match(REGEX.COUNT_SPACES) || []).length;
    const noOfSpecialSymbols = (text.match(REGEX.COUNT_SPECIAL_CHARS) || [])
      .length;

    const analysis: Analysis = {
      bold,
      italian,
      underline,
      quotes,
      currCase,
      align,
      font,
      no_of_letters: noOfLetters,
      no_of_words: noOfWords,
      no_of_integers: noOfIntegers,
      no_of_spaces: noOfSpace,
      no_of_specialsymbols: noOfSpecialSymbols,
    };

    setAnalysis(analysis);
  };

  return (
    <div className="editorcomp">
      <h1>Editor</h1>
      <div className="button">
        <button className="bold" aria-labelledby="boldbtn" onClick={Bold}>
          B
        </button>
        <button className="italian" aria-labelledby="italian" onClick={Italian}>
          I
        </button>
        <button
          className="underline"
          aria-labelledby="underline"
          onClick={Underline}
        >
          U
        </button>

        {/* create a button with className="size" and when clicked it should call changeFont() function used to increase
        the font. The display value of this button should be "A+" */}

        <button
          className="size"
          aria-labelledby="increase-font-size"
          onClick={changeFont}
        >
          A+
        </button>

        {/* create a button with className="size" and when clicked it should call changeFont() function used to decrease
         the font. The display value of this button should be "A-" */}

        <button
          className="size"
          aria-labelledby="decrease-font-size"
          onClick={changeFont}
        >
          A-
        </button>

        <button className="align" onClick={(e) => changeAlign("left")}>
          {"<"}
        </button>
        <button
          className="align"
          aria-labelledby="align"
          onClick={(e) => changeAlign("center")}
        >
          ^
        </button>
        <button className="align" onClick={(e) => changeAlign("right")}>
          {">"}
        </button>
        <button className="quotes" onClick={Quotes}>
          " "
        </button>

        <button className="caseChange" onClick={(e) => caseChange("u")}>
          UC
        </button>
        <button className="caseChange" onClick={(e) => caseChange("l")}>
          LC
        </button>
        <button className="caseChange" onClick={(e) => caseChange("c")}>
          C
        </button>

        <button className="Empty" onClick={reset}>
          X
        </button>

        {/* create a button with className="analyse" and when clicked it should call Analyse() function used to analyse
         the text in text area. The display value of this button should be "Analyse" */}

        <button className="analyse" onClick={Analyse}>
          analyse
        </button>
      </div>
      <textarea
        name="editor"
        id="editor"
        cols={30}
        rows={10}
        aria-labelledby="type Something..."
        onChange={(e) => settext(e.target.value)}
        value={text}
      ></textarea>

      {/* { create a textarea with aria-labelledby="ANALYSIS", type diabled , className="analysis" , and its should display 
      the object result generated by the the Analyse function .} */}
      <textarea
        name="analysis"
        id="analysis"
        cols={30}
        rows={10}
        aria-labelledby="type Something..."
        onChange={(e) => settext(e.target.value)}
        value={
          Object.keys(Analysis).length > 0
            ? JSON.stringify(Analysis, null, 2)
            : "Click Analyse"
        }
        disabled
      ></textarea>
    </div>
  );
};

export default Editor;
