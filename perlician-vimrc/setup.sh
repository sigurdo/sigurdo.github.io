#!/bin/bash

echo "Setting up Perlecian's .vimrc..."

cd $HOME/

wget https://raw.githubusercontent.com/sigurdo/sigurdo.github.io/refs/heads/master/perlician-vimrc/.vimrc

# Install vim-plug
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

vim -c 'PlugInstall'

