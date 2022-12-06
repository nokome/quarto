/*
 * Dialog.tsx
 *
 * Copyright (C) 2022 by Posit Software, PBC
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

import React, { PropsWithChildren } from 'react';

import { Classes, Button, Intent, Dialog as BlueprintDialog, Props } from '@blueprintjs/core';

import dialogStyles from './Dialog.module.scss';

export interface DialogProps extends Props {
  title?: string;
  isOpen: boolean;
  leftButtons?: JSX.Element;
  onOpening?: () => void;
  onOpened?: () => void;
  onOK?: () => void;
  onCancel?: () => void;
}

export const Dialog: React.FC<PropsWithChildren<DialogProps>> = props => {
  const onKeyUp = (event: React.KeyboardEvent<HTMLFormElement>) => {
    const isTextArea = () => {
      return document.activeElement && document.activeElement.tagName === 'TEXTAREA';
    };
    if (event.keyCode === 13 && props.onOK && !isTextArea()) {
      props.onOK();
    }
  };

  return (
    <BlueprintDialog
      isOpen={props.isOpen}
      title={props.title}
      className={dialogStyles.dialog}
      onOpening={props.onOpening}
      onOpened={props.onOpened}
      autoFocus={true}
      enforceFocus={true}
      canEscapeKeyClose={true}
      canOutsideClickClose={false}
      isCloseButtonShown={true}
      shouldReturnFocusOnClose={true}
      transitionDuration={150}
      hasBackdrop={false}
      onClose={props.onCancel}
      style={{userSelect: 'none'}}
    >
      <form onKeyUp={onKeyUp}>
        <div className={Classes.DIALOG_BODY}>{props.children}</div>
        <div className={[Classes.DIALOG_FOOTER, dialogStyles.dialogFooter].join(' ')}>
          <div className={[Classes.DIALOG_FOOTER_ACTIONS, dialogStyles.dialogFooterActions].join(' ')}>
            <div className={dialogStyles.dialogFooterActionsLeft}>{props.leftButtons}</div>
            <div className={dialogStyles.dialogFooterActionsRight}>
              <Button onClick={props.onCancel}>Cancel</Button>
              <Button intent={Intent.PRIMARY} onClick={props.onOK}>
                OK
              </Button>
            </div>
          </div>
        </div>
      </form>
    </BlueprintDialog>
  );
};
