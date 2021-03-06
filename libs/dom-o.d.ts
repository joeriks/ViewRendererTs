﻿interface IDomoTag {

    (attributes: Object, innerHtml?: string, ...childTag: Function[]): any;
    (innerHtml?: string, ...childTag: Function[]): any;

}

interface ICSS {
    (selector: string, ...childTag: any[]): any;
}

var A, ABBR, ACRONYM, ADDRESS, AREA, ARTICLE, ASIDE, AUDIO,
      B, BDI, BDO, BIG, BLOCKQUOTE, BODY, BR, BUTTON,
      CANVAS, CAPTION, CITE, CODE, COL, COLGROUP, COMMAND,
      DATALIST, DD, DEL, DETAILS, DFN, DIV, DL, DT, EM,
      EMBED, FIELDSET, FIGCAPTION, FIGURE, FOOTER, FORM, FRAME,
      FRAMESET, H1, H2, H3, H4, H5, H6, HEAD, HEADER,
      HGROUP, HR, HTML, I, IFRAME, IMG, INPUT, INS, KBD,
      KEYGEN, LABEL, LEGEND, LI, LINK, MAP, MARK, META,
      METER, NAV, NOSCRIPT, OBJECT, OL, OPTGROUP, OPTION,
      OUTPUT, P, PARAM, PRE, PROGRESS, Q, RP, RT, RUBY,
      SAMP, SCRIPT, SECTION, SELECT, SMALL, SOURCE, SPAN,
      SPLIT, STRONG, STYLE, SUB, SUMMARY, SUP, TABLE, TBODY,
      TD, TEXTAREA, TFOOT, TH, THEAD, TIME, TITLE, TR,
      TRACK, TT, UL, VAR, VIDEO, WBR: IDomoTag;

var CSS: ICSS;