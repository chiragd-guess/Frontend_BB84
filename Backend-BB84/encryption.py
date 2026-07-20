def text_to_bits(text):

    return ''.join(
        format(ord(char), '08b')
        for char in text
    )


def bits_to_text(bits):

    chars = []

    for i in range(0, len(bits), 8):

        byte = bits[i:i+8]

        if len(byte)==8:
            chars.append(
                chr(int(byte,2))
            )

    return ''.join(chars)



def xor_encrypt(message, key):

    message_bits = text_to_bits(message)


    repeated_key = (
        key *
        ((len(message_bits)//len(key))+1)
    )[:len(message_bits)]


    cipher_bits = ''.join(

        str(
            int(m)^int(k)
        )

        for m,k in zip(
            message_bits,
            repeated_key
        )

    )


    return cipher_bits



def xor_decrypt(cipher_bits, key):

    repeated_key = (
        key *
        ((len(cipher_bits)//len(key))+1)
    )[:len(cipher_bits)]


    plain_bits = ''.join(

        str(
            int(c)^int(k)
        )

        for c,k in zip(
            cipher_bits,
            repeated_key
        )

    )


    return bits_to_text(plain_bits)