{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  packages = [
    pkgs.git
    pkgs.nodejs
    pkgs.python3
  ];
}