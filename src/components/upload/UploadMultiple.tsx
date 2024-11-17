import React, {
  FC,
  useRef,
  useCallback,
  HTMLAttributes,
  DragEvent,
  useId,
  memo,
} from 'react';
import cx from 'classnames';
import { useTranslation } from 'hooks/useTranslation';
import { VALIDATE_TYPES } from 'constants/file.const';
import {
  checkFileSize,
  checkValidExtensionOfMultiFileEvent,
} from 'helpers/file.helper';

export type UploadMultipleProps = Omit<
  HTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onClear?: () => void;
  onChange?: (file: Array<File> | null, source?: Array<string> | null) => void;
  value?: Array<File>;
  accept?: string;
  isError?: boolean;
  ContainerProps?: HTMLAttributes<HTMLDivElement>;
};

const UploadMultiple: FC<UploadMultipleProps> = ({
  onClear,
  onChange,
  value,
  children,
  accept = '*',
  ContainerProps,
  ...rest
}) => {
  const id = useId();
  const { T } = useTranslation();
  const inputFile = useRef<HTMLInputElement>(null);

  const clearFileInput = () => {
    if (inputFile.current) {
      inputFile.current.value = '';
    }
  };

  const handleClear = useCallback(() => {
    onChange?.(null, null);
    onClear?.();
    clearFileInput();
  }, [onChange, onClear]);

  // TODO: refactor types
  const handleChange = useCallback(
    (e: any) => {
      const list: FileList = e.dataTransfer
        ? e.dataTransfer.files
        : e.target.files;
      const file: Array<File> = [];

      if (!e?.target?.value?.length) return;

      for (let i = 0; i < list.length; i++) {
        file.push(list[i]);
      }
      if (file && file.length) {
        if (
          checkValidExtensionOfMultiFileEvent(e, accept) !== VALIDATE_TYPES.OK
        ) {
          // toastError(
          //   T('error:exceedSizeFile', {
          //     size: getFileSizeToString(MAX_UPLOAD_SIZE_BYTE),
          //   }),
          // );
          clearFileInput();
          return;
        }
        if (checkFileSize(file) !== VALIDATE_TYPES.OK) {
          // toastError(
          //   T('error:exceedSizeFile', {
          //     size: getFileSizeToString(MAX_UPLOAD_SIZE_BYTE),
          //   }),
          // );
          clearFileInput();
          return;
        }
        const loadImage = (image: File) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event: any) => {
              resolve(event.target.result);
            };
            reader.readAsDataURL(image);
          });
        Promise.all(file.map((item: File) => loadImage(item))).then((data) => {
          onChange?.(file, data as any);
        });
        clearFileInput();
      } else {
        handleClear();
      }
    },
    [accept, T, onChange, handleClear],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleChange(e);
    },
    [handleChange],
  );

  return (
    <div
      {...ContainerProps}
      className={cx('pb-multiple-upload-container', ContainerProps?.className)}
    >
      <label htmlFor={id} className="pb-upload-container-label">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="pb-upload-container-droppable"
        >
          {children || T('common:clickToUpload')}
        </div>
        <input
          {...rest}
          id={id}
          type="file"
          ref={inputFile}
          className="pb-upload-container-file-input"
          onChange={handleChange}
          accept={accept}
          multiple
        />
      </label>
      {!!value && (
        <button
          type="button"
          className="pb-upload-btn-clear"
          onClick={handleClear}
        >
          {T('common:deleteFile')}
        </button>
      )}
    </div>
  );
};

export default memo(UploadMultiple);
