import { ActionIcon, ActionIconGroup } from '@mantine/core'
import { modals } from '@mantine/modals'
import { PublicKey } from '@solana/web3.js'
import { IconFlame, IconSend, IconX } from '@tabler/icons-react'

import { AccountUiFormBurn, AssetUiFormSend } from './asset-ui-form-send.tsx'
import { ellipsify } from './ellipsify'

export function AssetUiTokenActions({
  available,
  burn,
  close,
  mint,
  send,
}: {
  available: string
  burn?: (input: { amount: string }) => Promise<void>
  close?: () => Promise<void>
  mint: PublicKey
  send?: (input: { destination: string; amount: string }) => Promise<void>
}) {
  return (
    <ActionIconGroup>
      {send && (
        <ActionIcon
          disabled={!available}
          title="Send"
          variant="light"
          size="lg"
          onClick={() =>
            modals.open({
              title: `Send '${ellipsify(mint.toString(), 8)}' tokens`,
              size: 'lg',
              centered: true,
              children: (
                <AssetUiFormSend available={available} send={(input) => send(input).then(() => modals.closeAll())} />
              ),
            })
          }
        >
          <IconSend size={24} />
        </ActionIcon>
      )}
      {burn && (
        <ActionIcon
          disabled={!available}
          title="Burn"
          variant="light"
          size="lg"
          onClick={() =>
            modals.open({
              title: `Burn '${ellipsify(mint.toString(), 8)}' tokens`,
              size: 'lg',
              centered: true,
              children: (
                <AccountUiFormBurn available={available} burn={(input) => burn(input).then(() => modals.closeAll())} />
              ),
            })
          }
        >
          <IconFlame size={24} />
        </ActionIcon>
      )}
      {close && (
        <ActionIcon
          disabled={!!available}
          title="Close"
          variant="light"
          size="lg"
          onClick={() => {
            if (!window.confirm(`Close account '${ellipsify(mint.toString(), 8)}'?`)) return
            close().then(() => modals.closeAll())
          }}
        >
          <IconX size={24} />
        </ActionIcon>
      )}
    </ActionIconGroup>
  )
}
