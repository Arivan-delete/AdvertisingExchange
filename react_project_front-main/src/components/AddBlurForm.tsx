import React from 'react';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//import IconButton from '@material-ui/core/IconButton';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
//import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { useHomeStyles } from '../pages/theme';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddBlur, fetchBlurs, setAddFormState } from '../store/ducks/blurs/actionCreators';
import { selectAddFormState } from '../store/ducks/blurs/selectors';
import { AddFormState } from '../store/ducks/blurs/contracts/state';
import { UploadImages } from './UploadImages';
import { uploadImage } from '../utils/uploadImage';
import { selectUserData } from '../store/ducks/user/selectors'

interface AddBlurFormProps {
  classes: ReturnType<typeof useHomeStyles>;
  maxRows?: number;
}

const MAX_LENGTH = 280;

export interface ImageObj {
  blobUrl: string;
  file: File;
}

export const AddBlurForm: React.FC<AddBlurFormProps> = ({
  classes,
  maxRows,
}: AddBlurFormProps): React.ReactElement => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState<string>('');
  const [images, setImages] = React.useState<ImageObj[]>([]);

  const userCurrent = useSelector(selectUserData)

  const addFormState = useSelector(selectAddFormState);
  const textLimitPercent = Math.round((text.length / 280) * 100);
  const textCount = MAX_LENGTH - text.length;

  const handleChangeTextare = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    if (e.currentTarget) {
      setText(e.currentTarget.value);
    }
  };

  const handleClickAddBlur = async (): Promise<void> => {
    let result = [];
    dispatch(setAddFormState(AddFormState.LOADING));
    for (let i = 0; i < images.length; i++) {
      const file = images[i].file;
      const url = await uploadImage(file, userCurrent);
      result.push(url);
    }
    dispatch(fetchAddBlur({ text, images: result }));
    setText('');
    setImages([]);
    dispatch(fetchBlurs());
  };

  return (
    <div>
      <div className={classes.addFormBody}>
        <Avatar className={classes.blurAvatar} alt={`Аватарка користувача UserAvatar`} src="https://cdn130.picsart.com/324781271027201.jpg?type=webp&to=min&r=240"/>
        <TextareaAutosize
          onChange={handleChangeTextare}
          className={classes.addFormTextarea}
          placeholder="Створити нову пропозицію?"
          value={text}
          rowsMax={maxRows}
        />
      </div>
      <div className={classes.addFormBottom}>
        <div className={classNames(classes.blurFooter, classes.addFormBottomActions)}>
          <UploadImages images={images} onChangeImages={setImages} />
        </div>
        <div className={classes.addFormBottomRight}>
          {text && (
            <>
              <span>{textCount}</span>
              <div className={classes.addFormCircleProgress}>
                <CircularProgress
                  variant="static"
                  size={20}
                  thickness={5}
                  value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                  style={text.length >= MAX_LENGTH ? { color: 'red' } : undefined}
                />
                <CircularProgress
                  style={{ color: 'rgba(0, 0, 0, 0.1)' }}
                  variant="static"
                  size={20}
                  thickness={5}
                  value={100}
                />
              </div>
            </>
          )}
          <Button
            onClick={handleClickAddBlur}
            disabled={addFormState === AddFormState.LOADING || !text || text.length >= MAX_LENGTH}
            color="primary"
            variant="contained">
            {addFormState === AddFormState.LOADING ? (
              <CircularProgress color="inherit" size={16} />
            ) : (
              'Створити допис'
            )}
          </Button>
        </div>
      </div>
      {addFormState === AddFormState.ERROR && (
        <Alert severity="error">
          Помилка при створенні реклами{' '}
          <span aria-label="emoji-plak" role="img">
            😞
          </span>
        </Alert>
      )}
    </div>
  );
};
