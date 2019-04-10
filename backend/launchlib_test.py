import unittest
import launchlib
from uuid import uuid4

class TestLaunchlib(unittest.TestCase):

    def test_remove_empty_child_field(self):
        original = {"child":{'field':""}}
        new = launchlib.parse_dict(original)
        assert len(new['child-field']) == 0

    def test_remove_empty_field(self):
        original = {'field':""}
        new = launchlib.remove_empty(original)

        assert len(new) == 0 

    def test_parse_dict_child_child_field(self):
        txt = str(uuid4())
        original = {"child1":{"child2":{"field":txt}}}
        new = launchlib.parse_dict(original.copy())
        assert txt == new['child1-child2-field']

    def test_parse_dict_child_field(self):
        original = {"child":{"field":str(uuid4())}}
        new = launchlib.parse_dict(original.copy())

        assert original['child']['field'] == new['child-field']
        
    def test_parse_dict_chield_array(self):
        txt = str(uuid4())
        original = {"child":{"field":[txt]}}
        new = launchlib.parse_dict(original.copy())
        assert txt == new['child-field-0']
        
    def test_parse_dict_field(self):
        original = {"field":str(uuid4())}
        new = launchlib.parse_dict(original.copy())

        assert original['field'] == new['field']

    def test_parse_decimal(self):
        original = {"field": 4.0}
        new = launchlib.parse_number(original.copy())
        assert type(new['field']) == str

    def test_parse_array_field(self):
        original = {"field":[str(uuid4()),str(uuid4())]}
        new = launchlib.parse_array(original.copy())

        assert new['field-0'] == original['field'][0]
        assert new['field-1'] == original['field'][1]

    def test_parse_dict_array_child_field(self):
        original = [str(uuid4()),str(uuid4())]
        new = launchlib.parse_dict({"child":{"field":original}})

        assert new['child-field-0'] == original[0]
        assert new['child-field-1'] == original[1]

if __name__ == '__main__':
    unittest.main()