/*
 * xref-popup.tsx
 *
 * Copyright (C) 2020 by RStudio, PBC
 *
 * Unless you have received this program directly from RStudio pursuant
 * to the terms of a commercial license agreement with RStudio, then
 * this program is licensed to you under the terms of version 3 of the
 * GNU Affero General Public License. This program is distributed WITHOUT
 * ANY EXPRESS OR IMPLIED WARRANTY, INCLUDING THOSE OF NON-INFRINGEMENT,
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Please refer to the
 * AGPL (http://www.gnu.org/licenses/agpl-3.0.txt) for more details.
 *
 */


import { Schema } from "prosemirror-model";
import { PluginKey } from "prosemirror-state";
import { DecorationSet, EditorView } from "prosemirror-view";

import React from "react";

import { EditorUI } from "../../api/ui";
import { EditorNavigation } from "../../api/navigation";
import { textPopupDecorationPlugin, TextPopupTarget } from "../../api/text-popup";
import { WidgetProps } from "../../api/widgets/react";
import { Popup } from "../../api/widgets/popup";


export function xrefPopupPlugin(schema: Schema, ui: EditorUI, nav: EditorNavigation) {

  return textPopupDecorationPlugin({
    key: new PluginKey<DecorationSet>('xref-popup'),
    markType: schema.marks.xref,
    maxWidth: 370,
    dismissOnEdit: true,
    createPopup: (view: EditorView, target: TextPopupTarget, style: React.CSSProperties) => {
      return (
        <XRefPopup
          target={target}
          ui={ui}
          nav={nav}
          style={style}
        />
      );
    },
    specKey: (target: TextPopupTarget) => {
      return `xref:${target.text}`;
    }
  });

}

interface XRefPopupProps extends WidgetProps {
  target: TextPopupTarget;
  ui: EditorUI;
  nav: EditorNavigation;
  style: React.CSSProperties;
}

const XRefPopup: React.FC<XRefPopupProps> = props => {
  return (
    <Popup classes={['pm-popup-link']} style={props.style}>
      {props.target.text}
    </Popup>
  );
};