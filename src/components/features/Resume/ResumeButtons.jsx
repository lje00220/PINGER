import { BUTTON_MODE } from '../../../constants/mode';
import { Button } from '../../common/Button';

// 초기에는 읽기모드만 지원합니다 (수정/삭제 버튼)
// 수정 버튼을 클릭하면 편집모드로 전환됩니다. (수정/삭제 -> 저장/취소 버튼)

const ResumeButtons = ({
  isOwner,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onReview,
}) => {
  if (isOwner) {
    return isEditing ? (
      <div className="flex gap-4">
        <Button onClick={onSave} mode={BUTTON_MODE.S}>
          저장
        </Button>
        <Button onClick={onCancel} mode={BUTTON_MODE.S}>
          취소
        </Button>
      </div>
    ) : (
      <div className="flex gap-4">
        <Button onClick={onEdit} mode={BUTTON_MODE.S}>
          수정
        </Button>
        <Button onClick={onDelete} mode={BUTTON_MODE.S}>
          삭제
        </Button>
      </div>
    );
  } else {
    // recruiter(멘토)일 경우
    return (
      <Button onClick={onReview} mode={BUTTON_MODE.S}>
        검토
      </Button>
    );
  }
};

export default ResumeButtons;
