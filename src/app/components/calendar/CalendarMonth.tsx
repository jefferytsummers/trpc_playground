import { Dispatch, SetStateAction } from "react";
import { Month, months } from "./Calendar";
import { parseMonth } from "@/utils/util";

export const CalendarMonth = ({
  selectedMonth,
  setSelectedMonth,
}: {
  selectedMonth: Month;
  setSelectedMonth: (month: Month) => void;
}): JSX.Element => {
  return (
    <select defaultValue={selectedMonth} className="select w-full text-center rounded-b-none border text-xl max-w-xs bg-primary text-primary-content focus:ring">
      {months.map((month) => (
        <option key={month} onClick={(e) => setSelectedMonth(parseMonth(e.currentTarget.value))}>
          {month}
        </option>
      ))}
    </select>
  );
};
