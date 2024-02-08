import {
  Close,
  Content,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';
import { WrapperType } from '../../utils/types';

type ModalProps = WrapperType & {
  trigger: ReactNode;
  title: string;
};

export function Modal({ children, trigger, title }: ModalProps) {
  return (
    <Root>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <Overlay className='fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow'>
          <Content className='fixed left-[50%] top-[50%] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-5 data-[state=open]:animate-contentShow focus:outline-none'>
            <div className='flex items-center justify-between gap-5'>
              <Title className='text-lg font-semibold'>{title}</Title>
              <Close>
                <IoMdClose />
              </Close>
            </div>
            <div className='mt-5'>{children}</div>
          </Content>
        </Overlay>
      </Portal>
    </Root>
  );
}
