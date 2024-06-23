import pytest
from pluralize import pluralize

def test_pluralize_dog():
    assert pluralize("dog") == "dogs"

    