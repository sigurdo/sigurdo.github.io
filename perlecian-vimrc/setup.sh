#!/bin/bash

cd $HOME/

if test -f .vimrc; then
    echo "A .vimrc already exists. Please delete it or rename it, then try again."
    exit 1
fi

wget https://raw.githubusercontent.com/sigurdo/sigurdo.github.io/refs/heads/master/perlecian-vimrc/.vimrc

# Install vim-plug
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

vim -c 'PlugInstall'

