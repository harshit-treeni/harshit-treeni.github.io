import { DatePicker } from "@mui/x-date-pickers";
import clsx from "clsx";
import { IoMdCloseCircle } from "react-icons/io";

export default function MyDatePicker({ date, onChange, onClear, minDate, maxDate }) {

  const datePickerSx = {
    '& .MuiInputBase-root': {
      borderRadius: '9999px',
      padding: date ? '0px 18px 0px 18px' : '0px 18px 0px 0px',
      fontSize: date !== null ? '16px' : '0.875rem',
      width: '170px',
      height: '40px',
      backgroundColor: 'white',
      '&:focus': {
        outline: 'none',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiSvgIcon-root': {
        fontSize: '18px',
      },
    },
  };

  return <div className="relative">
    <DatePicker
      minDate={minDate}
      maxDate={maxDate}
      value={date}
      onChange={(newValue) => onChange(newValue)}
      sx={datePickerSx}
      slotProps={{ textField: { readOnly: true }}}
      format="DD-MM-YYYY"
      />
    <IoMdCloseCircle
      onClick={onClear}
      className={clsx(
        "absolute top-[9px] left-[6px] text-[22px] text-red-400 cursor-pointer hover:text-red-500",
        { hidden: !date },
        { visible: date }
      )}
    />
  </div> 
}