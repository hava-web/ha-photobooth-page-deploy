import type React from 'react';

export const FORM_INPUT_CLASS =
  'min-h-13 w-full rounded border border-brand-control bg-white px-4 text-base leading-normal text-brand-text outline-none placeholder:text-brand-placeholder focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30 phone:text-brand-caption';

export const REGISTER_FORM_DEMAND_OPTIONS = [
  'Nhượng quyền',
  'Thuê máy',
  'Bán máy',
];

export const REGISTER_FORM_LOCATION_OPTIONS = [
  'Đã có',
  'Đang tìm',
  'Cần Fun Studio hỗ trợ tìm mặt bằng',
];

export const REGISTER_FORM_TIMING_OPTIONS = [
  'Trong 1 tháng tới',
  '1 - 3 tháng',
  'Trên 3 tháng',
];

export const REGISTER_FORM_BUDGET_OPTIONS = [
  'Dưới 400 triệu',
  '400 - 800 triệu',
  'Trên 800 triệu',
];

export const RegisterOption: React.FC<{
  children: React.ReactNode;
  name: string;
}> = ({ children, name }) => (
  <label className="flex min-h-3.4 cursor-pointer items-center gap-3 text-base leading-snug text-brand-text phone:text-brand-caption">
    <input
      aria-label={String(children)}
      type="checkbox"
      name={name}
      value={String(children)}
      className="h-2.2 w-2.2 shrink-0 rounded border-brand-control accent-brand-pink"
    />
    <span>{children}</span>
  </label>
);

export const RegisterFieldGroup: React.FC<{
  children: React.ReactNode;
  label?: string;
}> = ({ children, label }) => (
  <fieldset className="m-0 rounded border border-brand-control px-3.5 pb-3 pt-3.5">
    {label && (
      <legend className="px-0.5 text-base leading-snug text-brand-text phone:text-brand-caption">
        {label}
      </legend>
    )}
    <div className="grid gap-0.8">{children}</div>
  </fieldset>
);
