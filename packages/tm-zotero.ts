<TeXmacs|1.99.9>

<style|source>

<\body>
  <active*|<\src-title>
    <src-package|tm-zotero|0.007-UT-1-W>

    <\src-purpose>
      This package contains extended macros for citations and provides a
      <TeXmacs> integration with the Juris-M or Zotero reference manager for
      Firefox.

      \;

      It utilizes the same wire-protocol interface that is used by the Zotero
      \<rightarrow\> OpenOffice.org integration;<compound|math|>

      \;

      That works by applying a monkey-patch to Juris-M / Zotero that adds a
      new outputFormat, which is roughly based on BibTeX's 'bbl' format, and
      then switches the integration to use the new outputFormat.

      \;

      Thus while it's in use, the ordinary LibreOffice integration won't
      work. In order to use Juris-M or Zotero with LibreOffice again, you
      must uninstall or disable the Firefox propachi-texmacs addon.
    </src-purpose>

    <src-copyright|2016|Karl Martin Hegbloom>

    <\src-license>
      This software falls under the <hlink|GNU general public license,
      version 3 or later|$TEXMACS_PATH/LICENSE>. It comes WITHOUT ANY
      WARRANTY WHATSOEVER. You should have received a copy of the license
      which the software. If not, see <hlink|http://www.gnu.org/licenses/gpl-3.0.html|http://www.gnu.org/licenses/gpl-3.0.html>.
    </src-license>
  </src-title>>

  <use-module|(tm-zotero)>

  <use-package|std-counter|std-utils|env-float|std-list|std-markup>

  \;

  <assign|ParagraphSignGlyph|<macro|\<paragraph\>>>

  <assign|SectionSignGlyph|<macro|�>>

  <assign|ldquo|\P>

  <assign|rdquo|\Q>

  <assign|ztlt|\<less\>>

  <assign|ztgt|\<gtr\>>

  \;

  <assign|ztDebug|<macro|body|<extern|(lambda (body) (zt-format-debug
  "Debug:ztDebug: ~s\\n" body))|<arg|body>>>>

  \;

  <assign|XXXusepackage*|<macro|ign1|ign2|<concealed|<arg|ign1><arg|ign2>>>>

  <\active*>
    <\src-comment>
      In order to prevent the latex to texmacs conversion from mangling
      these, I had to prefix them with zt to get it past the substitution
      phase of the converter.
    </src-comment>
  </active*>

  <assign|zttextit|<macro|body|<with|font-shape|italic|<arg|body>>>>

  <assign|zttextsl|<macro|body|<with|font-shape|slanted|<arg|body>>>>

  <assign|zttextup|<macro|body|<with|font-shape|right|<arg|body>>>>

  <assign|zttextsc|<macro|body|<with|font-shape|small-caps|<arg|body>>>>

  <assign|zttextnormal|<macro|body|<with|font-family|rm|font-shape|right|font-series|medium|<arg|body>>>>

  <assign|zttextbf|<macro|body|<with|font-series|bold|<arg|body>>>>

  <assign|zttextmd|<macro|body|<with|font-series|medium|<arg|body>>>>

  <\active*>
    <\src-comment>
      Default values to avoid transcient "bad case" errors being thrown
      (regarding a \\case macro) prior to setting documentData.
    </src-comment>
  </active*>

  <assign|zotero-pref-noteType0|true>

  <assign|zotero-pref-noteType1|false>

  <assign|zotero-pref-noteType2|false>

  <\active*>
    <\src-comment>
      <with|color|red|Todo:> What should happen when the citation style is
      set to noteType2 (endnote) and the writer wants to make a note? Should
      there still be footnotes, as well as endnotes? Or should there be a
      general purpose macro that switches depending on which style has been
      selected, so that changing styles automatically moves the manually
      created notes between being footnotes or endnotes? Will anyone really
      use it?
    </src-comment>
  </active*>

  <\active*>
    <\src-comment>
      Flag to prevent the attempt to create notes inside of notes problem. By
      default, we are not inside of a footnote or endnote.
    </src-comment>
  </active*>

  <assign|zt-not-inside-note|true>

  <assign|zt-in-footnote|false>

  <assign|zt-in-endnote|false>

  <\active*>
    <\src-comment>
      Ditto, but for things that depend on not being inside of a
      zbibliography.
    </src-comment>
  </active*>

  <assign|zt-not-inside-zbibliography|true>

  <\active*>
    <\src-comment>
      Per zcite option, to force an in-text citation when using a CSL "note"
      style.
    </src-comment>
  </active*>

  <assign|zt-option-this-zcite-in-text|false>

  <\active*>
    <\src-comment>
      Setup for special handling of in-text citations inside of footnotes and
      endnotes; And for hlinks with extra href's displayed as footnotes, and
      hrefs that display as footnotes rather than in-text.
    </src-comment>
  </active*>

  <assign|zt-orig-footnote|<value|footnote>>

  \;

  <assign|zt-footnote|<macro|body|<style-with|src-compact|none|<next-footnote><with|zt-not-inside-note|false|zt-in-footnote|true|<render-footnote|<the-footnote>|<arg|body>>><space|0spc><label|<merge|footnr-|<the-footnote>>><rsup|<with|font-shape|right|<reference|<merge|footnote-|<the-footnote>>>>>>>>

  \;

  <assign|footnote|<value|zt-footnote>>

  <\active*>
    <\src-comment>
      End-notes <with|color|red|ARE NOT WORKING.> I do not know how to do
      this without it storing typesetter-expanded things into the endnote
      attachment aux... quote / eval ?
    </src-comment>
  </active*>

  <new-counter|endnote>

  <assign|endnote-sep|<footnote-sep>>

  <assign|endnote-item-render|<value|aligned-space-item>>

  <assign|endnote-item-transform|<value|identity>>

  <new-list|endnote-list|<value|endnote-item-render>|<value|endnote-item-transform>>

  <assign|the-endnotes|<macro|<endnote-list*|<get-attachment|endnotes>>>>

  <assign|render-endnote*|<\macro|sym|nr|body>
    <write|endnotes|<style-with|src-compact|all|<with|par-mode|justify|par-left|0cm|par-right|0cm|font-shape|right|<style-with|src-compact|none|<surround|<locus|<id|<hard-id|<arg|body>>>|<link|hyperlink|<id|<hard-id|<arg|body>>>|<url|<merge|#endnr-|<arg|nr>>>>|<item*|<arg|sym>>><endnote-sep>|<set-binding|<merge|endnote-|<arg|nr>>|<value|the-label>|body><right-flush>|<style-with|src-compact|none|<arg|body>>>>>>>
  </macro>>

  <assign|render-endnote|<macro|nr|body|<render-endnote*|<arg|nr>|<arg|nr>|<arg|body>>>>

  <assign|zt-endnote|<macro|body|<style-with|src-compact|none|<next-endnote><with|zt-not-inside-note|false|zt-in-endnote|true|<render-endnote|<the-endnote>|<arg|body>>><space|0spc><label|<merge|endnr-|<the-endnote>>><rsup|<with|font-shape|right|<reference|<merge|endnote-|<the-endnote>>>>>>>>

  <assign|zt-endnote|<with|color|red|ENDNOTES NOT IMPLEMENTED.> See:
  tm-zotero.ts>

  <\active*>
    <\src-comment>
      Links are wrapped in this macro so that they can be rendered
      differently depending on whether they are in-text, in footnote or
      endnote, or in a bibliography. I could not simply redefine hlink the
      way I did with footnote, since it is a primitive defined in C++.
    </src-comment>
  </active*>

  <assign|tm-zotero-ext-ensure-ztHref-interned!|<macro|url-for-tree|<extern|(lambda
  (url-for-tree-t) (tm-zotero-ext:ensure-ztHref-interned!
  url-for-tree-t))|<arg|url-for-tree>>>>

  <assign|ztHref|<macro|url|display|<tm-zotero-ext-ensure-ztHref-interned!|<arg|url>><if|<and|<value|zt-not-inside-note>|<value|zt-not-inside-zbibliography>>|<hlink|URL|<arg|url>><space|0.2spc><rsup|(><if|<value|zotero-pref-noteType2>|<zt-endnote|<small|<hlink|<arg|display>|<arg|url>>>>|<zt-footnote|<small|<hlink|<arg|display>|<arg|url>>>>><rsup|)>|<small|<hlink|<arg|display>|<arg|url>>>>>>

  <drd-props|ztHref|accessible|all|enable-writability|all|border|yes>

  <\active*>
    <\src-comment>
      hashLabel is not yet used by ztHrefFromBibToURL but available to it or
      to code acting on it.
    </src-comment>
  </active*>

  <assign|tm-zotero-ext-ensure-ztHref*-interned!|<macro|hashLabel|<extern|(lambda
  (fieldID-t) (tm-zotero-ext:ensure-ztHref*-interned!
  fieldID-t))|<arg|hashLabel>>>>

  <assign|zt-link-BibToURL|true>

  <assign|ztHrefFromBibToURL|<macro|hashLabel|url|display|<tm-zotero-ext-ensure-ztHref*-interned!|<arg|hashLabel>><with|link-BibToURL|<value|zt-link-BibToURL>|<if|<value|link-BibToURL>|<hlink|<arg|display>|<arg|url>>|<arg|display>>>>>

  <assign|ztHrefFromBibToURL*|<value|ztHrefFromBibToURL>>

  <assign|zt-link-FromCiteToBib|true>

  <assign|ztDefaultCiteURL|>

  <assign|ztHrefFromCiteToBib|<macro|hashLabel|url|display|<tm-zotero-ext-ensure-ztHref*-interned!|<arg|hashLabel>><with|link-FromCiteToBib|<value|zt-link-FromCiteToBib>|link-BibToURL|<value|zt-link-BibToURL>|<case|<and|<value|link-FromCiteToBib>|<has-zbibliography?>>|<label|<merge|zciteID|<value|zt-zciteID>|<arg|hashLabel>>><hlink|<arg|display>|<arg|hashLabel>>|<and|<value|link-FromCiteToBib>|<value|link-BibToURL>>|<hlink|<arg|display>|<arg|url>>|<arg|display>>>>>

  <assign|ztHrefFromCiteToBib*|<value|ztHrefFromCiteToBib>>

  <\active*>
    <\src-comment>
      Citation display depending on CSL noteType: 0
      \<rightarrow\><compound|text|<compound|math|>><compound|math|><compound|math|>
      in-text, 1 \<rightarrow\> footnote, 2 \<rightarrow\> end-note, plus
      override per zcite.
    </src-comment>
  </active*>

  <assign|zt-zciteID|0>

  <assign|zt-zcite-in-text|<macro|fieldID|citebody|<set-binding|<merge|zotero|<arg|fieldID>|-noteIndex>|<case|<value|zt-not-inside-note>|0|<value|zt-in-footnote>|<value|footnote-nr>|<value|zt-in-endnote>|<value|endnote-nr>>><with|zt-zciteID|<arg|fieldID>|<arg|citebody>>>>

  <assign|zt-zcite-as-footnote|<macro|fieldID|citebody|<zt-footnote|<set-binding|<merge|zotero|<arg|fieldID>|-noteIndex>|<value|footnote-nr>><with|zt-zciteID|<arg|fieldID>|<arg|citebody>>>>>

  <assign|zt-zcite-as-endnote|<macro|fieldID|citebody|<zt-endnote|<set-binding|<merge|zotero|<arg|fieldID>|-noteIndex>|<value|endnote-nr>><with|zt-zciteID|<arg|fieldID>|<arg|citebody>>>>>

  \;

  <assign|render-zcite|<macro|fieldID|citebody|<case|<or|<value|zotero-pref-noteType0>|<value|zt-option-this-zcite-in-text>>|<zt-zcite-in-text|<arg|fieldID>|<arg|citebody>>|<and|<value|zotero-pref-noteType1>|<value|zt-not-inside-note>>|<zt-zcite-as-footnote|<arg|fieldID>|<arg|citebody>>|<and|<value|zotero-pref-noteType2>|<value|zt-not-inside-note>>|<zt-zcite-as-endnote|<arg|fieldID>|<arg|citebody>>|<zt-zcite-in-text|<arg|fieldID>|<arg|citebody>>>>>

  <\active*>
    <\src-comment>
      When <with|font-family|tt|development_extensions.csl_reverse_lookup_support
      = true;> in citeproc.js, it can print out a bunch of information that I
      couldn't help but experimentally enable once just to see what it does.
      I'm not convinced that I want to use it for anything, but just in case,
      it's still possible as long as these macros are defined and are output
      by the bbl outputFormat in that case.

      \\ztShowID{\\ztcslidNode{#{state.opt.nodenames[cslid]}}\\ztcslid{#{cslid}}#{str}}}
    </src-comment>
  </active*>

  <assign|ztShowID|<macro|node|cslid|body|<extern|(lambda (node cslid body)
  (tm-zotero-ext:ztShowID node cslid body))|<arg|node>|<arg|cslid>|<arg|body>>>>

  <\active*>
    <\src-comment>
      These are used below to simplify the expressions inside the macros, to
      make them easier to read.
    </src-comment>
  </active*>

  <assign|ztRigidHspace|<macro|len|<hspace|<arg|len>|<arg|len>|<arg|len>>>>

  <assign|ztRawWidth|<macro|body|<look-up|<box-info|<arg|body>|w>|0>>>

  <assign|ztAsTmlen|<macro|rawWidth|<times|1tmpt|<arg|rawWidth>>>>

  <\active*>
    <\src-comment>
      The itemID here is the same as the itemID in the zfield-Code JSON when
      "Store References in Document" is enabled via the Document Preferences
      dialogue. This will be useful for hyperlinking, I think. That will
      require scheme code that has access to the information parsed from the
      JSON.
    </src-comment>
  </active*>

  <assign|zbibCitationItemID|<macro|itemID|<extern|(lambda (itemID)
  (tm-zotero-ext:zbibCitationItemID itemID))|<arg|itemID>>>>

  <\active*>
    <\src-comment>
      The indent will be the same as that set by the firstLineIndent and
      bodyIndent.

      Look at std-utils.ts for the indentation macros and see if they can be
      used to improve this sometime when I'm not about to run out of
      batteries.

      The amount of space after the label in ztLeftMargin ought to be such
      that the text following it lines up exactly with the rest of the
      bibliography entry, that is, at zotero-BibliographyStyle_bodyIndent...
      but whenever the width of a label is such that it's first line is
      pushed over to the right, then perhaps the bodyIndent ought to increase
      by that amount?

      Anyway, this works pretty good now.
    </src-comment>
  </active*>

  <assign|ztNewBlock|<macro|body|<surround|<next-line>|<next-line>|<arg|body>>>>

  \;

  <assign|ztbibIndent|<macro|body|<arg|body>>>

  <assign|zt-item-hsep|1spc>

  \;

  <assign|ztLeftMargin|<macro|label|<arg|label><with|tab-stop|<if|<greatereq|<get-arity|<value|zotero-BibliographyStyle_arrayList>>|1>|<look-up|<value|zotero-BibliographyStyle_arrayList>|0>|<value|zotero-BibliographyStyle_bodyIndent>>|<ztRigidHspace|<if|<greater|<ztRawWidth|<ztRigidHspace|<value|tab-stop>>>|0>|<ztAsTmlen|<minimum|<minus|<ztRawWidth|<ztRigidHspace|<value|tab-stop>>>|<plus|<ztRawWidth|<arg|label>>|<ztRawWidth|<ztRigidHspace|<value|zt-item-hsep>>>>>|<ztRawWidth|<ztRigidHspace|<value|zt-item-hsep>>>>>|<value|zt-item-hsep>>>>>>

  \;

  <assign|ztRightInline|<value|identity>>

  \;

  <assign|ztbibItemText|<\macro|sysID|insert|citekey|body>
    <\with|par-sep|<times|<value|par-sep>|<value|zotero-BibliographyStyle_lineSpacing>>|ztbibItem-vsep|<times|<value|ztbibItem-vsep>|<value|zotero-BibliographyStyle_entrySpacing>>>
      <\surround|<vspace*|<value|item-vsep>>|<right-flush>>
        <\with|par-no-first|false|par-first|<value|zotero-BibliographyStyle_firstLineIndent>|par-left|<value|zotero-BibliographyStyle_bodyIndent>>
          <label|<merge|zbibSysID|<arg|sysID>>><arg|body><ztbibItemRefsList|<arg|sysID>>
        </with>
      </surround>
    </with>
  </macro>>

  \;

  \;

  <assign|zt-render-bibItemRefsLists|true>

  <assign|zbibItemRefsList-sep|, >

  <assign|XXXzbibItemRefsList-left| \ [<with|font-shape|italic|refs:> >

  <assign|zbibItemRefsList-left| \ [>

  <assign|zbibItemRefsList-right|]>

  \;

  <assign|XXXzbibItemRef|<macro|label|<if|<equal||<reference|<arg|label>>>||<SectionSignGlyph><reference|<arg|label>>
  on >p.<space|0.1spc><pageref|<arg|label>>>>

  <assign|zbibItemRef|<macro|label|<pageref|<arg|label>>>>

  \;

  <assign|zt-render-bibItemRefsList|<macro|sysID|<extern|(lambda (sysID)
  (tm-zotero-ext:ztbibItemRefsList sysID))|<arg|sysID>>>>

  <assign|ztbibItemRefsList|<macro|sysID|<with|render-bibItemRefsList|<value|zt-render-bibItemRefsLists>|<if|<value|render-bibItemRefsList>|<zt-render-bibItemRefsList|<arg|sysID>>>>>>

  \;

  <assign|ztbibitem|<macro|key|<extern|(lambda (key) (tm-zotero-ext:bibitem
  key))|<arg|key>>>>

  \;

  <assign|ztbibSubHeadingTextSize|1>

  <assign|ztbibSubHeadingVspace*|1fn>

  \;

  <assign|ztbibSubHeading|<macro|name|<with|subheading-vspace|<value|ztbibSubHeadingVspace*>|font-size|<value|ztbibSubHeadingTextSize>|<sectional-normal-bold|<vspace*|<value|subheading-vspace>><arg|name>>>>>

  <\active*>
    <\src-comment>
      Juris-M / Zotero Citations and Bibliography. Both the zcite and
      zbibliography macros must have the same arity, semantics, and order of
      arguments because Zotero treats them generically as "fields".

      The use of `surround' in the zbibliography forces it to be typeset in
      block context. Without that, the lines don't wrap properly and run off
      the right edge of the page. The zcite on the other hand must be in line
      context, because if it's block context, you can't put a citation
      in-text without it forcing itself to be on it's own line. When I was
      trying to use a converter from rtf to TeXmacs, they kept coming out as
      blocks rather than in-line.

      tm-zotero-ensure-zfield-interned! triggers adding of the zfield to the
      tm-zotero data structures used to keep track of zfields in the buffer
      and the information needed for the integration with Juris-M or Zotero.
      This macro is not meant to be used outside of the expansion of the
      zcite or zbibliography macros.
    </src-comment>
  </active*>

  <assign|tm-zotero-ensure-zfield-interned!|<macro|fieldID|<extern|(lambda
  (fieldID-t) (tm-zotero-ext:ensure-zfield-interned!
  fieldID-t))|<arg|fieldID>>>>

  <assign|zcite-flag-if-modified|<macro|fieldCode|<case|<look-up|<arg|fieldCode>|2>|<flag|Modified|red>|<flag|Not
  Modified|green>>>>

  <assign|zcite|<macro|fieldID|fieldCode|fieldText|<tm-zotero-ensure-zfield-interned!|<arg|fieldID>><zcite-flag-if-modified|<arg|fieldCode>><with|dummy|<value|zt-link-FromCiteToBib>|<render-zcite|<arg|fieldID>|<arg|fieldText>>>>>

  <drd-props|render-zcite|accessible|1>

  <drd-props|zcite|disable-writability|0|unaccessible|0|disable-writability|1|unaccessible|1|enable-writability|2|accessible|2>

  \;

  <assign|zt-option-zbib-font-size|0.84>

  <assign|zbibColumns|1>

  <assign|zt-option-zbib-zt-wrap-with-page-break-before|false>

  <assign|zt-option-zbib-zt-wrap-with-new-double-page-before|false>

  <assign|zt-extra-surround-before|>

  \;

  <assign|zbibliography|<\macro|fieldID|fieldCode|fieldText>
    <\surround|<case|<equal|2|<value|zbibPageBefore>>|<new-dpage*>|<equal|1|<value|zbibPageBefore>>|<page-break*>|><zt-extra-surround-before><set-binding|<merge|zotero|<arg|fieldID>|-noteIndex>|0>|<right-flush>>
      <tm-zotero-ensure-zfield-interned!|<arg|fieldID>><principal-section*|<bibliography-text>>

      <with|font-size|<value|zt-option-zbib-font-size>|par-left|0tab|par-first|0tab|par-no-first|true|zt-not-inside-zbibliography|false|par-columns|<value|zbibColumns>|dummy|<value|ztbibSubHeadingVspace*>|dummy|<value|zt-link-BibToURL>|dummy|<value|zt-render-bibItemRefsLists>|dummy|<value|zbibPageBefore>|<arg|fieldText>>
    </surround>
  </macro>>

  <drd-props|zbibliography|disable-writability|0|unaccessible|0|disable-writability|1|unaccessible|1|enable-writability|2|accessible|2>

  \;

  <assign|has-zbibliography?|<macro|<extern|(lambda ()
  (tm-zotero-ext:document-has-zbibliography?))>>>

  \;

  <assign|inside-footnote?|<macro|t|<extern|(lambda (t)
  (tm-zotero-ext:inside-footnote? t))|<arg|t>>>>

  <assign|inside-endnote?|<macro|t|<extern|(lambda (t)
  (tm-zotero-ext:inside-endnote? t))|<arg|t>>>>

  <assign|inside-note?|<macro|t|<extern|(lambda (t)
  (tm-zotero-ext:inside-note? t))|<arg|t>>>>

  <assign|inside-zcite?|<macro|t|<extern|(lambda (t)
  (tm-zotero-ext:inside-zcite? t))|<arg|t>>>>

  <assign|inside-zbibliography?|<macro|t|<extern|(lambda (t)
  (tm-zotero-ext:inside-zbibliography? t))|<arg|t>>>>

  <assign|not-inside-zbibliography?|<macro|t|<extern|(lambda (t)
  (tm-zotero-ext:not-inside-zbibliography? t))|<arg|t>>>>

  <assign|inside-zfield?|<macro|t|<extern|(lambda (t)
  (tm-zotero-ext:inside-zfield? t))|<arg|t>>>>

  \;

  \;

  \;
</body>

<\initial>
  <\collection>
    <associate|font|TeX Gyre Termes>
    <associate|math-font|math-termes>
    <associate|preamble|true>
  </collection>
</initial>