import Counter from '@/components/Counter/wrap';
import Header from '@/components/Header';
import StartUpChecker from '@/components/startupChecker';
import { getTranslations } from 'next-intl/server';
import { Flex } from 'antd';
export default async function MainLayout({ children }) {
  const t = await getTranslations();
  console.log('page render....');
  return (
    <Flex style={{ maxWidth: '1200px', margin: 'auto' }} vertical>
      <StartUpChecker />
      <Header />
      {children}
    </Flex>
  );
}
