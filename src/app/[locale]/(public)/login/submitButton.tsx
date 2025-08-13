'use client';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';
// @ts-ignore
import { useFormStatus } from 'react-dom';
export default function SubmitButton() {
  const t = useTranslations();
  const { pending } = useFormStatus();
  console.log('pending....', pending);
  return (
    <Button type="primary" size="large" htmlType="submit" style={{ width: '100%' }} loading={pending}>
      {t('login-button')}
    </Button>
  );
}
